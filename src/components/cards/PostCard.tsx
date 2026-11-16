import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../models/types';
import { GoldenCowEmblem, SafeImage, VerifiedBadge } from '../common/KrishnaDecorations';
import {
  IgBookmarkIcon,
  IgCalendarIcon,
  IgCommentIcon,
  IgHeartIcon,
  IgMapPinIcon,
  IgMoreDotsIcon,
  IgSharePlaneIcon,
} from '../icons/AppIcons';
import { AutoPlayVideo } from '../media/AutoPlayVideo';
import { VideoPlayerModal } from '../media/VideoPlayerModal';

interface PostCardProps {
  post: CommunityPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    toggleLikePost,
    toggleSavePost,
    sharePost,
    addPostComment,
    setSelectedBusinessId,
    setActiveTab,
    showToast,
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    thumb: string;
    duration?: string;
  } | null>(null);

  const handleBusinessOpen = () => {
    if (post.businessId) {
      setSelectedBusinessId(post.businessId);
      setActiveTab('businesses');
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submittingComment) return;
    setSubmittingComment(true);
    await addPostComment(post.id, commentText);
    setCommentText('');
    setSubmittingComment(false);
  };

  const primaryMedia = post.media[0];
  const isFitZone = post.businessId === 'biz_fitzone';

  return (
    <article className="bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_12px_rgba(6,27,70,0.05)] overflow-hidden">
      {/* Header Row */}
      <div className="flex items-start justify-between px-4 pt-3.5 pb-2.5 gap-3">
        <button
          type="button"
          onClick={handleBusinessOpen}
          className="flex items-center gap-3 text-left min-w-0 cursor-pointer group"
        >
          {isFitZone ? (
            <div className="w-10 h-10 rounded-full bg-[#111827] border-2 border-[#E9A526] flex flex-col items-center justify-center shrink-0 shadow-sm">
              <GoldenCowEmblem className="w-5 h-3.5" walk={false} />
              <span className="text-[6px] font-extrabold tracking-wider text-[#F5D58B] leading-none">
                FITZONE
              </span>
            </div>
          ) : (
            <SafeImage
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover border border-[#E9A526]/60 shrink-0"
            />
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[15px] font-bold text-[#061B46] truncate group-hover:text-[#0B347A]">
                {post.authorName}
              </h3>
              {post.isVerified && <VerifiedBadge size={15} />}
            </div>
            <p className="text-xs text-[#667085] truncate">
              {post.isSponsored ? 'Sponsored' : post.category} · {post.location}
            </p>
          </div>
        </button>

        {/* Contextual More Menu */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowMenu((m) => !m)}
            aria-label="Post options"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[#667085] hover:bg-[#FFF8ED] hover:text-[#061B46] cursor-pointer"
          >
            <IgMoreDotsIcon className="w-5 h-5" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white border border-[#EADBC2] shadow-lg py-1 z-20 text-xs">
              {post.businessId && (
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    handleBusinessOpen();
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#FFF8ED] text-[#061B46] font-medium cursor-pointer"
                >
                  View Business Profile
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  toggleSavePost(post.id);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-[#FFF8ED] text-[#061B46] font-medium cursor-pointer"
              >
                {post.isSaved ? 'Remove Bookmark' : 'Save Advertisement'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  showToast('Reported to community moderators', 'info');
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-[#FFF8ED] text-[#667085] cursor-pointer"
              >
                Report Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Description */}
      <div className="px-4 pb-3">
        <p className="text-[14px] leading-[1.45] text-[#1D2939]">{post.description}</p>
        {post.contentType === 'event' && (post.eventDate || post.eventVenue) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#0B347A]">
            {post.eventDate && (
              <span className="inline-flex items-center gap-1">
                <IgCalendarIcon className="w-3.5 h-3.5 text-[#D99B27]" />
                {post.eventDate}
              </span>
            )}
            {post.eventVenue && (
              <span className="inline-flex items-center gap-1">
                <IgMapPinIcon className="w-3.5 h-3.5 text-[#D99B27]" />
                {post.eventVenue}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Media Attachment(s) */}
      {primaryMedia && (
        <div className="px-3.5 pb-1">
          {post.media.length === 1 ? (
            primaryMedia.type === 'video' ? (
              <AutoPlayVideo
                src={primaryMedia.url}
                poster={primaryMedia.thumbnailUrl || primaryMedia.url}
                durationLabel={primaryMedia.duration || '0:45'}
                alt={post.authorName}
                aspectClass="aspect-[16/9]"
                onExpand={() =>
                  setActiveVideo({
                    url: primaryMedia.url,
                    thumb: primaryMedia.thumbnailUrl || primaryMedia.url,
                    duration: primaryMedia.duration || '0:45',
                  })
                }
              />
            ) : (
              <div className="relative rounded-xl overflow-hidden bg-[#061B46] aspect-[16/9]">
                <SafeImage
                  src={primaryMedia.thumbnailUrl || primaryMedia.url}
                  alt={post.authorName}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {post.media.slice(0, 4).map((media) =>
                media.type === 'video' ? (
                  <AutoPlayVideo
                    key={media.id}
                    src={media.url}
                    poster={media.thumbnailUrl || media.url}
                    durationLabel={media.duration || '0:30'}
                    alt={post.authorName}
                    aspectClass="aspect-[4/3]"
                    onExpand={() =>
                      setActiveVideo({
                        url: media.url,
                        thumb: media.thumbnailUrl || media.url,
                        duration: media.duration || '0:30',
                      })
                    }
                  />
                ) : (
                  <div
                    key={media.id}
                    className="relative rounded-xl overflow-hidden bg-[#061B46] aspect-[4/3]"
                  >
                    <SafeImage
                      src={media.thumbnailUrl || media.url}
                      alt={post.authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      )}

      {/* Action Row: Likes, Comments, Shares, Bookmark */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#F4E9D6]/70 mt-2">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => toggleLikePost(post.id)}
            className="inline-flex items-center gap-1.5 min-h-[36px] text-xs font-semibold text-[#1D2939] hover:text-[#ED4956] transition-colors cursor-pointer"
            aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
          >
            <IgHeartIcon
              filled={post.isLiked}
              className={`w-[20px] h-[20px] transition-transform active:scale-125 ${
                post.isLiked ? 'text-[#ED4956]' : 'text-[#262626]'
              }`}
            />
            <span className="tabular-nums">{post.likesCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComments((c) => !c)}
            className="inline-flex items-center gap-1.5 min-h-[36px] text-xs font-semibold text-[#262626] hover:text-[#061B46] transition-colors cursor-pointer"
            aria-label="Comments"
          >
            <IgCommentIcon className="w-[20px] h-[20px]" />
            <span className="tabular-nums">
              {post.id === 'post_fitzone_01' ? 36 + post.comments.length : post.comments.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => sharePost(post.id)}
            className="inline-flex items-center gap-1.5 min-h-[36px] text-xs font-semibold text-[#262626] hover:text-[#0B347A] transition-colors cursor-pointer"
            aria-label="Share post"
          >
            <IgSharePlaneIcon className="w-[20px] h-[20px]" />
            <span className="tabular-nums">{post.sharesCount}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleSavePost(post.id)}
          aria-label={post.isSaved ? 'Remove bookmark' : 'Save post'}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-[#FFF8ED] cursor-pointer"
        >
          <IgBookmarkIcon
            filled={post.isSaved}
            className={`w-[20px] h-[20px] ${
              post.isSaved ? 'text-[#061B46]' : 'text-[#262626]'
            }`}
          />
        </button>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="px-4 py-3 bg-[#FFF8ED]/70 border-t border-[#EADBC2]/70 space-y-3">
          {post.comments.length === 0 ? (
            <p className="text-xs text-[#667085]">Be the first community member to comment.</p>
          ) : (
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {post.comments.map((cmt) => (
                <div key={cmt.id} className="flex items-start gap-2.5">
                  <SafeImage
                    src={cmt.authorAvatar}
                    alt={cmt.authorName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#E9A526]/50"
                  />
                  <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-[#EADBC2]/60">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#061B46]">{cmt.authorName}</span>
                      <span className="text-[10px] text-[#667085]">{cmt.createdAt}</span>
                    </div>
                    <p className="text-xs text-[#1D2939] mt-0.5">{cmt.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmitComment} className="flex items-center gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a supportive comment..."
              className="flex-1 bg-white border border-[#EADBC2] rounded-full px-3.5 py-2 text-xs text-[#061B46] placeholder-[#667085] focus:outline-none focus:border-[#0B347A]"
            />
            <button
              type="submit"
              disabled={!commentText.trim() || submittingComment}
              aria-label="Send comment"
              className="w-9 h-9 rounded-full bg-royal-pill text-white flex items-center justify-center disabled:opacity-45 cursor-pointer shrink-0"
            >
              <IgSharePlaneIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <VideoPlayerModal
          isOpen={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          title={post.authorName}
          subtitle={`${post.category} · ${post.location}`}
          thumbnailUrl={activeVideo.thumb}
          videoUrl={activeVideo.url}
          durationLabel={activeVideo.duration}
          onOpenBusiness={post.businessId ? handleBusinessOpen : undefined}
        />
      )}
    </article>
  );
};
