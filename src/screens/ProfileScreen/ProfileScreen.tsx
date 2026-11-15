import React, { useMemo, useRef, useState } from 'react';
import { PostCard } from '../../components/cards/PostCard';
import {
  PeacockCornerDecorations,
  SafeImage,
  VerifiedBadge,
} from '../../components/common/KrishnaDecorations';
import {
  IgBackIcon,
  IgBookmarkIcon,
  IgChevronRightIcon,
  IgCloseIcon,
  IgCommunityIcon,
  IgEditIcon,
  IgHeartIcon,
  IgLogoutIcon,
  IgMapPinIcon,
  IgPostGridIcon,
  IgSettingsIcon,
  IgShopIcon,
  IgSparklesIcon,
} from '../../components/icons/AppIcons';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../theme/tokens';

interface ProfileScreenProps {
  onOpenAuth: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenAuth }) => {
  const {
    user,
    posts,
    businesses,
    groups,
    updateUserProfile,
    setActiveTab,
    setSelectedBusinessId,
    toggleFollowBusiness,
    navigateBack,
    logoutUser,
    replaySplash,
    showToast,
  } = useApp();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState<
    null | 'myBusiness' | 'myPosts' | 'savedPosts' | 'myGroups'
  >(null);

  const [editName, setEditName] = useState(user.fullName);
  const [editLocation, setEditLocation] = useState(user.location);
  const [editBio, setEditBio] = useState(user.bio);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editBusinessName, setEditBusinessName] = useState(user.businessName || '');

  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const myPosts = useMemo(
    () => posts.filter((p) => p.isMine || p.authorName === user.fullName),
    [posts, user.fullName],
  );
  const savedPosts = useMemo(() => posts.filter((p) => p.isSaved), [posts]);
  const followedBusinesses = useMemo(
    () => businesses.filter((b) => b.isFollowed),
    [businesses],
  );
  const joinedGroups = useMemo(() => groups.filter((g) => g.isJoined), [groups]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateUserProfile({ avatar: url });
    e.target.value = '';
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    updateUserProfile({
      fullName: editName.trim(),
      location: editLocation.trim() || 'Hyderabad, Telangana',
      bio: editBio.trim(),
      phone: editPhone.trim(),
      businessName: editBusinessName.trim() || undefined,
    });
    setEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] pb-24 md:pb-12 relative overflow-x-hidden flex flex-col">
      {/* Krishna Navy Header matching Screen 6 */}
      <header className="bg-krishna-header text-white px-4 pt-3.5 pb-3.5 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={navigateBack}
            aria-label="Go back"
            className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IgBackIcon className="w-5 h-5 text-white" />
          </button>

          <h1 className="font-display text-[24px] sm:text-[26px] font-semibold tracking-wide text-white">
            My Profile
          </h1>

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Profile settings"
            className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IgSettingsIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* Vrindavan Sunset Cover Banner matching Screen 6 */}
      <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-[#E9A526]/30">
        <img
          src={ASSETS.vrindavanTreeCowSunset}
          alt="Vrindavan sunset landscape"
          className="w-full h-full object-cover object-center"
        />
        <svg
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 right-0 w-full h-7 pointer-events-none"
          aria-hidden="true"
        >
          <path d="M0,44 Q720,-8 1440,44 L1440,52 L0,52 Z" fill="#FFF8ED" />
        </svg>
      </div>

      {/* Main Profile Content */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 -mt-16 relative z-10 space-y-5">
        {/* Avatar & Member Identity */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full p-1 bg-white shadow-[0_6px_20px_rgba(6,27,70,0.18)] ring-2 ring-[#E9A526]/60">
              <SafeImage
                src={user.avatar}
                alt={user.fullName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Change profile photo"
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#0B347A] text-white border-2 border-white shadow-md flex items-center justify-center hover:bg-[#061B46] transition-colors cursor-pointer"
            >
              <IgEditIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <h2 className="font-display text-[26px] sm:text-[28px] font-bold text-[#061B46] leading-tight">
              {user.fullName}
            </h2>
            {user.verified && <VerifiedBadge size={18} />}
          </div>

          <p className="text-xs font-medium text-[#475467] mt-0.5">{user.roleLabel}</p>

          <p className="inline-flex items-center gap-1 text-xs text-[#667085] mt-1">
            <IgMapPinIcon className="w-3.5 h-3.5 text-[#D99B27]" />
            <span>{user.location}</span>
          </p>

          <button
            type="button"
            onClick={() => {
              setEditName(user.fullName);
              setEditLocation(user.location);
              setEditBio(user.bio);
              setEditPhone(user.phone);
              setEditBusinessName(user.businessName || '');
              setEditModalOpen(true);
            }}
            className="mt-2.5 px-4 py-1.5 rounded-full bg-white border border-[#EADBC2] text-xs font-semibold text-[#0B347A] hover:border-[#D99B27] shadow-2xs transition-colors cursor-pointer"
          >
            Edit Profile
          </button>
        </div>

        {/* 4 Profile Statistics Cards: Posts | Likes | Groups | Saved */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={() => setActiveSheet('myPosts')}
            className="bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] py-3 px-1 flex flex-col items-center justify-center hover:border-[#D99B27] transition-colors cursor-pointer"
          >
            <IgPostGridIcon className="w-5 h-5 text-[#D99B27]" />
            <span className="mt-1.5 text-lg font-bold text-[#061B46] tabular-nums leading-none">
              {user.postsCount}
            </span>
            <span className="mt-1 text-[11px] font-medium text-[#667085]">Posts</span>
          </button>

          <div className="bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] py-3 px-1 flex flex-col items-center justify-center">
            <IgHeartIcon className="w-5 h-5 text-[#D99B27]" />
            <span className="mt-1.5 text-lg font-bold text-[#061B46] tabular-nums leading-none">
              {user.likesCount}
            </span>
            <span className="mt-1 text-[11px] font-medium text-[#667085]">Likes</span>
          </div>

          <button
            type="button"
            onClick={() => setActiveSheet('myGroups')}
            className="bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] py-3 px-1 flex flex-col items-center justify-center hover:border-[#D99B27] transition-colors cursor-pointer"
          >
            <IgCommunityIcon className="w-5 h-5 text-[#D99B27]" />
            <span className="mt-1.5 text-lg font-bold text-[#061B46] tabular-nums leading-none">
              {user.groupsCount}
            </span>
            <span className="mt-1 text-[11px] font-medium text-[#667085]">Groups</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSheet('savedPosts')}
            className="bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] py-3 px-1 flex flex-col items-center justify-center hover:border-[#D99B27] transition-colors cursor-pointer"
          >
            <IgBookmarkIcon className="w-5 h-5 text-[#D99B27]" />
            <span className="mt-1.5 text-lg font-bold text-[#061B46] tabular-nums leading-none">
              {user.savedCount}
            </span>
            <span className="mt-1 text-[11px] font-medium text-[#667085]">Saved</span>
          </button>
        </div>

        {/* 4 Profile Menu Rows matching Screen 6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-6">
          <button
            type="button"
            onClick={() => setActiveSheet('myBusiness')}
            className="w-full bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] px-4 py-3.5 flex items-center justify-between hover:border-[#D99B27] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-3.5 min-w-0">
              <IgShopIcon className="w-5 h-5 text-[#D99B27] shrink-0" />
              <span className="text-[14px] font-bold text-[#061B46] truncate">
                My Business{' '}
                <span className="font-normal text-[#667085]">(Optional)</span>
              </span>
            </span>
            <IgChevronRightIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setActiveSheet('myPosts')}
            className="w-full bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] px-4 py-3.5 flex items-center justify-between hover:border-[#D99B27] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-3.5 min-w-0">
              <IgPostGridIcon className="w-5 h-5 text-[#D99B27] shrink-0" />
              <span className="text-[14px] font-bold text-[#061B46] truncate">
                My Posts
              </span>
            </span>
            <IgChevronRightIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setActiveSheet('savedPosts')}
            className="w-full bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] px-4 py-3.5 flex items-center justify-between hover:border-[#D99B27] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-3.5 min-w-0">
              <IgBookmarkIcon className="w-5 h-5 text-[#D99B27] shrink-0" />
              <span className="text-[14px] font-bold text-[#061B46] truncate">
                Saved Posts
              </span>
            </span>
            <IgChevronRightIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setActiveSheet('myGroups')}
            className="w-full bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_2px_10px_rgba(6,27,70,0.04)] px-4 py-3.5 flex items-center justify-between hover:border-[#D99B27] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-3.5 min-w-0">
              <IgCommunityIcon className="w-5 h-5 text-[#D99B27] shrink-0" />
              <span className="text-[14px] font-bold text-[#061B46] truncate">
                My Groups
              </span>
            </span>
            <IgChevronRightIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
          </button>
        </div>
      </div>

      {/* Peacock Corner Decorations */}
      <PeacockCornerDecorations />

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Edit Profile"
          onClick={() => setEditModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#FFF8ED] rounded-3xl overflow-hidden border border-[#E9A526]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-krishna-header text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <IgCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#061B46] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#061B46] mb-1">Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#061B46] mb-1">Phone</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#061B46] mb-1">
                  My Business Name (Optional)
                </label>
                <input
                  type="text"
                  value={editBusinessName}
                  onChange={(e) => setEditBusinessName(e.target.value)}
                  placeholder="Krishna Biryani House"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#061B46] mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-royal-pill text-white font-semibold text-sm shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Account Settings"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#FFF8ED] rounded-3xl overflow-hidden border border-[#E9A526]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-krishna-header text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold">Settings &amp; Account</h3>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <IgCloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="bg-white rounded-2xl border border-[#EADBC2] p-4 space-y-1">
                <p className="text-xs font-semibold text-[#667085]">Registered Email</p>
                <p className="text-sm font-bold text-[#061B46]">{user.email}</p>
                <p className="text-xs text-[#667085] pt-1">{user.bio}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  replaySplash();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-white border border-[#EADBC2] text-sm font-semibold text-[#061B46] flex items-center justify-between hover:border-[#D99B27] cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <IgSparklesIcon className="w-4 h-4 text-[#D99B27]" />
                  <span>Replay Welcome Splash Screen</span>
                </span>
                <IgChevronRightIcon className="w-4 h-4 text-[#667085]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  logoutUser();
                  onOpenAuth();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-red-50 border border-red-200 text-sm font-semibold text-red-700 flex items-center justify-center gap-2 hover:bg-red-100 cursor-pointer"
              >
                <IgLogoutIcon className="w-4 h-4" />
                <span>Sign Out / Switch Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Sub-Views Sheet (My Business / My Posts / Saved Posts / My Groups) */}
      {activeSheet && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveSheet(null)}
        >
          <div
            className="w-full max-w-xl bg-[#FFF8ED] rounded-t-3xl sm:rounded-3xl max-h-[86vh] flex flex-col overflow-hidden shadow-2xl border border-[#E9A526]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-krishna-header text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold">
                {activeSheet === 'myBusiness' && 'My Business & Followed'}
                {activeSheet === 'myPosts' && 'My Posts & Advertisements'}
                {activeSheet === 'savedPosts' && 'Saved Posts'}
                {activeSheet === 'myGroups' && 'My Joined Groups'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveSheet(null)}
                className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <IgCloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeSheet === 'myBusiness' && (
                <>
                  <div className="bg-white rounded-2xl border border-[#EADBC2] p-4 flex items-center gap-3.5">
                    <img
                      src={ASSETS.ornamentCowLying}
                      alt=""
                      aria-hidden="true"
                      className="w-16 h-14 object-contain shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#061B46] truncate">
                          {user.businessName || 'Register Your Business'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSheet(null);
                            setActiveTab('create');
                          }}
                          className="px-3 py-1 rounded-full bg-royal-pill text-white text-xs font-semibold cursor-pointer shrink-0"
                        >
                          Publish Ad
                        </button>
                      </div>
                      <p className="text-xs text-[#667085]">
                        Promote your Yadav-owned business directly to community members.
                      </p>
                    </div>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#061B46] pt-1">
                    Followed Businesses ({followedBusinesses.length})
                  </h4>
                  {followedBusinesses.length === 0 ? (
                    <p className="text-xs text-[#667085]">
                      You are not following any businesses yet.
                    </p>
                  ) : (
                    followedBusinesses.map((biz) => (
                      <div
                        key={biz.id}
                        className="bg-white rounded-2xl border border-[#EADBC2] p-3 flex items-center justify-between gap-3"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSheet(null);
                            setSelectedBusinessId(biz.id);
                            setActiveTab('businesses');
                          }}
                          className="flex items-center gap-3 text-left min-w-0 cursor-pointer"
                        >
                          <SafeImage
                            src={biz.coverImage}
                            alt={biz.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#061B46] truncate">{biz.name}</p>
                            <p className="text-xs text-[#667085] truncate">{biz.subCategory}</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFollowBusiness(biz.id)}
                          className="px-3 py-1.5 rounded-full border border-[#EADBC2] text-xs font-semibold text-[#0B347A] hover:bg-[#FFF8ED] shrink-0 cursor-pointer"
                        >
                          Unfollow
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}

              {activeSheet === 'myPosts' &&
                (myPosts.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-sm text-[#667085]">
                      You haven&apos;t published any posts yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSheet(null);
                        setActiveTab('create');
                      }}
                      className="px-5 py-2 rounded-full bg-royal-pill text-white text-xs font-semibold cursor-pointer"
                    >
                      Create Your First Post
                    </button>
                  </div>
                ) : (
                  myPosts.map((p) => <PostCard key={p.id} post={p} />)
                ))}

              {activeSheet === 'savedPosts' &&
                (savedPosts.length === 0 ? (
                  <p className="text-center py-8 text-sm text-[#667085]">
                    No saved posts yet. Tap the bookmark icon on any post to save it here.
                  </p>
                ) : (
                  savedPosts.map((p) => <PostCard key={p.id} post={p} />)
                ))}

              {activeSheet === 'myGroups' && (
                <>
                  {joinedGroups.length === 0 ? (
                    <p className="text-center py-8 text-sm text-[#667085]">
                      You haven&apos;t joined any groups yet.
                    </p>
                  ) : (
                    joinedGroups.map((grp) => (
                      <button
                        key={grp.id}
                        type="button"
                        onClick={() => {
                          setActiveSheet(null);
                          setActiveTab('community');
                          showToast(`Opened ${grp.name}`, 'info');
                        }}
                        className="w-full bg-white rounded-2xl border border-[#EADBC2] p-4 flex items-center justify-between text-left hover:border-[#D99B27] cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-bold text-[#061B46]">{grp.name}</p>
                          <p className="text-xs text-[#667085] mt-0.5">{grp.description}</p>
                        </div>
                        <IgChevronRightIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
                      </button>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
