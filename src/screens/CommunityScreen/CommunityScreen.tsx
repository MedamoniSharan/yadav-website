import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  Heart,
  Megaphone,
  MessageCircle,
  Send,
  Share2,
  Users,
  X,
} from 'lucide-react';
import { SafeImage } from '../../components/common/KrishnaDecorations';
import { useApp } from '../../context/AppContext';
import { CommunityGroup } from '../../models/types';
import { ASSETS } from '../../theme/tokens';

function formatMemberCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K Members`;
  }
  return `${count} Members`;
}

export const CommunityScreen: React.FC = () => {
  const {
    groups,
    selectedGroupId,
    setSelectedGroupId,
    toggleJoinGroup,
    addGroupDiscussion,
    toggleLikeGroupDiscussion,
    addGroupDiscussionComment,
    navigateBack,
    showToast,
  } = useApp();

  const [tab, setTab] = useState<'my' | 'discover'>('my');
  const [newPostText, setNewPostText] = useState('');
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const displayedGroups = useMemo(() => {
    if (tab === 'discover') return groups;
    // Match Screen 5: show all 4 groups prominently on initial view while highlighting joined status,
    // or show joined groups first
    return [...groups].sort((a, b) => Number(b.isJoined) - Number(a.isJoined));
  }, [groups, tab]);

  const activeGroup: CommunityGroup | null = useMemo(
    () => groups.find((g) => g.id === selectedGroupId) || null,
    [groups, selectedGroupId],
  );

  const renderGroupIcon = (iconKey: CommunityGroup['iconKey']) => {
    switch (iconKey) {
      case 'discussion':
        return <Users className="w-6 h-6 text-white" />;
      case 'promotions':
        return <Megaphone className="w-6 h-6 text-white" />;
      case 'jobs':
        return <Briefcase className="w-6 h-6 text-white" />;
      case 'events':
        return <Calendar className="w-6 h-6 text-white" />;
    }
  };

  const handlePublishDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGroup || !newPostText.trim()) return;
    addGroupDiscussion(activeGroup.id, newPostText);
    setNewPostText('');
  };

  const handleReplySubmit = (e: React.FormEvent, discussionId: string) => {
    e.preventDefault();
    if (!activeGroup || !replyText.trim()) return;
    addGroupDiscussionComment(activeGroup.id, discussionId, replyText);
    setReplyText('');
    setReplyTargetId(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] pb-24 md:pb-10 flex flex-col">
      {/* Krishna Navy Header matching Screen 5 */}
      <header className="bg-krishna-header text-white px-4 pt-3.5 pb-3.5 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={navigateBack}
            aria-label="Go back"
            className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <h1 className="font-display text-[24px] sm:text-[26px] font-semibold tracking-wide text-white">
            Community
          </h1>

          <div className="w-[44px]" aria-hidden="true" />
        </div>
      </header>

      {/* Vrindavan Krishna & Cow Banner matching Screen 5 */}
      <section
        aria-label="Our Community Stronger Together"
        className="relative overflow-hidden bg-gradient-to-r from-[#0B347A] via-[#1C4B8C] to-[#E69A4C] h-36 sm:h-44"
      >
        <img
          src={ASSETS.vrindavanSunset}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-95"
        />
        <img
          src={ASSETS.krishnaCowSprite}
          alt="Lord Krishna standing with cow in Vrindavan"
          className="absolute right-2 sm:right-8 bottom-2 h-[88%] w-auto object-contain drop-shadow-[0_4px_12px_rgba(6,27,70,0.4)] z-10"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(6,27,70,0.88) 0%, rgba(11,52,122,0.7) 42%, rgba(11,52,122,0.12) 72%, transparent 100%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto h-full px-5 sm:px-6 flex flex-col justify-center">
          <h2 className="font-display text-[25px] sm:text-[32px] font-semibold text-white leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] max-w-[230px] sm:max-w-sm">
            Our Community
            <span className="block">Stronger Together</span>
          </h2>
        </div>

        {/* Soft cream curved wave bottom border */}
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 right-0 w-full h-5 sm:h-7 pointer-events-none z-10"
          aria-hidden="true"
        >
          <path
            d="M0,18 C360,52 1080,-8 1440,26 L1440,48 L0,48 Z"
            fill="#FFF8ED"
          />
        </svg>
      </section>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Segmented Control: My Groups | Discover Groups */}
        <div className="bg-white rounded-full p-1 border border-[#EADBC2] shadow-xs grid grid-cols-2 gap-1 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setTab('my')}
            className={`py-2 px-4 rounded-full text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              tab === 'my'
                ? 'bg-royal-pill text-white shadow-sm'
                : 'text-[#061B46]/80 hover:text-[#061B46]'
            }`}
          >
            My Groups
          </button>
          <button
            type="button"
            onClick={() => setTab('discover')}
            className={`py-2 px-4 rounded-full text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              tab === 'discover'
                ? 'bg-royal-pill text-white shadow-sm'
                : 'text-[#061B46]/80 hover:text-[#061B46]'
            }`}
          >
            Discover Groups
          </button>
        </div>

        {/* Community Group Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayedGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroupId(group.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedGroupId(group.id);
              }}
              className="bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_3px_12px_rgba(6,27,70,0.05)] px-4 py-3.5 flex items-center justify-between gap-3 hover:border-[#D99B27] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: group.iconBg }}
                >
                  {renderGroupIcon(group.iconKey)}
                </div>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[#061B46] truncate">
                    {group.name}
                  </h3>
                  <p className="text-xs text-[#667085] tabular-nums mt-0.5">
                    {formatMemberCount(group.membersCount)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleJoinGroup(group.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-1 ${
                  group.isJoined
                    ? 'bg-[#EEF4FF] text-[#0B347A] border border-[#C7D7FE]'
                    : 'bg-white text-[#0B347A] border border-[#C7D7FE] hover:bg-[#0B347A] hover:text-white'
                }`}
              >
                {group.isJoined ? (
                  <>
                    <span>Joined</span>
                    <Check className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <span>Join</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Golden Flute & Peacock Feather Accent matching Screen 5 */}
      <div className="mt-8 pb-2 flex items-center justify-center gap-1 pointer-events-none select-none">
        <img
          src={ASSETS.goldenFlute}
          alt=""
          aria-hidden="true"
          className="h-11 w-auto object-contain opacity-95 -rotate-3"
        />
        <img
          src={ASSETS.peacockFeather}
          alt=""
          aria-hidden="true"
          className="h-14 w-auto object-contain opacity-95 -ml-5 rotate-12"
        />
      </div>

      {/* Group Discussion Modal Sheet */}
      {activeGroup && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-xs sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeGroup.name}
          onClick={() => setSelectedGroupId(null)}
        >
          <div
            className="w-full max-w-xl bg-[#FFF8ED] rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-[#E9A526]/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Group Header */}
            <div className="bg-krishna-header text-white px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: activeGroup.iconBg }}
                >
                  {renderGroupIcon(activeGroup.iconKey)}
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-semibold truncate">
                    {activeGroup.name}
                  </h2>
                  <p className="text-xs text-[#F5D58B] tabular-nums">
                    {formatMemberCount(activeGroup.membersCount)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleJoinGroup(activeGroup.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                    activeGroup.isJoined
                      ? 'bg-white/15 text-[#F5D58B] border border-[#F5D58B]/40'
                      : 'bg-gold-orb text-[#061B46]'
                  }`}
                >
                  {activeGroup.isJoined ? 'Joined ✓' : 'Join Group'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGroupId(null)}
                  aria-label="Close group"
                  className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-5 py-3 bg-white border-b border-[#EADBC2]">
              <p className="text-xs text-[#475467]">{activeGroup.description}</p>
            </div>

            {/* New Discussion Composer */}
            <form
              onSubmit={handlePublishDiscussion}
              className="px-5 py-3 bg-white/80 border-b border-[#EADBC2] flex items-center gap-2"
            >
              <input
                type="text"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder={`Start a discussion in ${activeGroup.name}...`}
                className="flex-1 px-3.5 py-2 rounded-full bg-white border border-[#EADBC2] text-xs text-[#061B46] placeholder-[#667085] focus:outline-none focus:border-[#0B347A]"
              />
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="px-4 py-2 rounded-full bg-royal-pill text-white text-xs font-semibold disabled:opacity-45 cursor-pointer shrink-0 inline-flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Discussions List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeGroup.discussions.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#667085]">
                  No discussions yet. Start the conversation above!
                </div>
              ) : (
                activeGroup.discussions.map((disc) => (
                  <div
                    key={disc.id}
                    className="bg-white rounded-2xl border border-[#EADBC2] p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <SafeImage
                          src={disc.authorAvatar}
                          alt={disc.authorName}
                          className="w-9 h-9 rounded-full object-cover border border-[#E9A526]/60 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#061B46] truncate">
                            {disc.authorName}
                          </h4>
                          <p className="text-[11px] text-[#667085] truncate">
                            {disc.role} · {disc.createdAt}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[13px] text-[#1D2939] leading-relaxed">{disc.content}</p>

                    <div className="flex items-center gap-5 pt-1 border-t border-[#F4E9D6] text-xs font-semibold text-[#475467]">
                      <button
                        type="button"
                        onClick={() => toggleLikeGroupDiscussion(activeGroup.id, disc.id)}
                        className="inline-flex items-center gap-1.5 hover:text-[#E11D48] cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            disc.isLiked ? 'fill-[#E11D48] text-[#E11D48]' : ''
                          }`}
                        />
                        <span className="tabular-nums">{disc.likesCount}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setReplyTargetId(replyTargetId === disc.id ? null : disc.id)
                        }
                        className="inline-flex items-center gap-1.5 hover:text-[#061B46] cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="tabular-nums">{disc.comments.length}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => showToast('Discussion link shared!')}
                        className="inline-flex items-center gap-1.5 hover:text-[#0B347A] cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Replies */}
                    {disc.comments.length > 0 && (
                      <div className="space-y-2 pt-2 pl-3 border-l-2 border-[#EADBC2]">
                        {disc.comments.map((reply) => (
                          <div key={reply.id} className="text-xs">
                            <span className="font-bold text-[#061B46]">{reply.authorName}: </span>
                            <span className="text-[#1D2939]">{reply.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {replyTargetId === disc.id && (
                      <form
                        onSubmit={(e) => handleReplySubmit(e, disc.id)}
                        className="flex items-center gap-2 pt-1"
                      >
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="flex-1 px-3 py-1.5 rounded-full bg-[#FFF8ED] border border-[#EADBC2] text-xs text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                        />
                        <button
                          type="submit"
                          disabled={!replyText.trim()}
                          className="px-3 py-1.5 rounded-full bg-royal-pill text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                        >
                          Reply
                        </button>
                      </form>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
