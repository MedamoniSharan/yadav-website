import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Phone,
  Play,
  Plus,
  Send,
  Tag,
  Video,
  X,
} from 'lucide-react';
import {
  PeacockCornerDecorations,
  SafeImage,
} from '../../components/common/KrishnaDecorations';
import { BUSINESS_CATEGORIES } from '../../constants/mockData';
import { useApp } from '../../context/AppContext';
import { PostContentType, PostMedia } from '../../models/types';
import { ASSETS } from '../../theme/tokens';

interface CreatePostScreenProps {
  initialMode?: PostContentType;
}

export const CreatePostScreen: React.FC<CreatePostScreenProps> = ({
  initialMode = 'post',
}) => {
  const { user, businesses, createNewPost, navigateBack, showToast } = useApp();

  const [contentType, setContentType] = useState<PostContentType>(initialMode);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('biz_biryani');
  const [businessName, setBusinessName] = useState('Krishna Biryani House');
  const [description, setDescription] = useState(
    'Special offer for Yadav Community! Flat 20% off this weekend. Visit us! 🎉',
  );
  const [category, setCategory] = useState('Food');
  const [location, setLocation] = useState('Kukatpally, Hyderabad');
  const [contactInfo, setContactInfo] = useState('+91 98492 77810');
  const [websiteUrl, setWebsiteUrl] = useState('https://krishnabiryanihouse.in');
  const [eventDate, setEventDate] = useState('Sat, Nov 28 · 6:00 PM');
  const [eventVenue, setEventVenue] = useState('Madhapur Community Hall, Hyderabad');
  const [mediaItems, setMediaItems] = useState<PostMedia[]>([
    {
      id: 'init_photo',
      type: 'image',
      url: ASSETS.biryaniPhoto,
    },
    {
      id: 'init_video',
      type: 'video',
      url: ASSETS.biryaniReel,
      thumbnailUrl: ASSETS.biryaniVideoThumb,
      duration: '0:30',
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const maxChars = 200;

  const handleBusinessSelect = (bizId: string) => {
    setSelectedBusinessId(bizId);
    if (bizId === 'personal') {
      setBusinessName(user.fullName);
      setLocation(user.location);
      setContactInfo(user.phone);
      return;
    }
    const found = businesses.find((b) => b.id === bizId);
    if (found) {
      setBusinessName(found.name);
      setCategory(found.category);
      setLocation(found.location);
      setContactInfo(found.phone);
      setWebsiteUrl(found.website);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const objectUrl = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video/');
      if (isVideo) {
        const videoEl = document.createElement('video');
        videoEl.preload = 'metadata';
        videoEl.src = objectUrl;
        videoEl.onloadedmetadata = () => {
          const secs = Math.round(videoEl.duration || 30);
          const m = Math.floor(secs / 60);
          const s = secs % 60;
          const dur = `${m}:${s < 10 ? '0' : ''}${s}`;
          setMediaItems((prev) => [
            ...prev,
            {
              id: `med_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
              type: 'video',
              url: objectUrl,
              thumbnailUrl: ASSETS.biryaniVideoThumb,
              duration: dur,
            },
          ]);
        };
      } else {
        setMediaItems((prev) => [
          ...prev,
          {
            id: `med_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            type: 'image',
            url: objectUrl,
          },
        ]);
      }
    });

    showToast(`${files.length} media item(s) added`);
    e.target.value = '';
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!businessName.trim()) {
      setFormError('Please enter a Business Name or Author title.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please write an advertisement or post description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const linkedBiz = businesses.find((b) => b.id === selectedBusinessId);
      await createNewPost({
        contentType,
        businessId: linkedBiz?.id,
        authorName: businessName.trim(),
        authorAvatar: linkedBiz?.coverImage || user.avatar,
        isVerified: true,
        isSponsored: Boolean(linkedBiz),
        location: location.trim() || 'Hyderabad',
        category,
        description: description.trim(),
        contactInfo: contactInfo.trim() || undefined,
        websiteUrl: websiteUrl.trim() || undefined,
        media: mediaItems,
        eventDate: contentType === 'event' ? eventDate : undefined,
        eventVenue: contentType === 'event' ? eventVenue : undefined,
      });
    } catch {
      setFormError('Unable to publish post right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] pb-24 md:pb-12 relative overflow-x-hidden flex flex-col">
      {/* Krishna Navy Header matching Screen 4 */}
      <header className="bg-krishna-header text-white px-4 pt-3.5 pb-5 rounded-b-[24px] shadow-[0_6px_20px_rgba(6,27,70,0.2)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={navigateBack}
            aria-label="Go back"
            className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <h1 className="font-display text-[21px] sm:text-2xl font-semibold tracking-wide text-white text-center">
            Create Post / Advertisement
          </h1>

          <div className="w-[44px]" aria-hidden="true" />
        </div>
      </header>

      {/* Main Form Card */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 pt-4 pb-10 relative z-10">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-3xl border border-[#EADBC2] shadow-[0_6px_24px_rgba(6,27,70,0.06)] p-4 sm:p-6 space-y-4 overflow-hidden"
        >
          {/* Segmented Content Type Selector: Post | Video | Event */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-[#FFF8ED] border border-[#EADBC2]">
            {(
              [
                { id: 'post', label: 'Post', icon: <ImageIcon className="w-4 h-4" /> },
                { id: 'video', label: 'Video', icon: <Video className="w-4 h-4" /> },
                { id: 'event', label: 'Event', icon: <Calendar className="w-4 h-4" /> },
              ] as { id: PostContentType; label: string; icon: React.ReactNode }[]
            ).map((tab) => {
              const active = contentType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setContentType(tab.id)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-royal-pill text-white shadow-sm'
                      : 'text-[#061B46]/80 hover:text-[#061B46]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {formError}
            </div>
          )}

          {/* Upload Photos / Videos Box */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-2xl border-2 border-dashed border-[#B9C2D0] bg-[#FFFDF9] hover:border-[#0B347A] hover:bg-[#FFF8ED]/60 transition-colors py-6 px-4 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B347A]/10 text-[#0B347A] flex items-center justify-center mb-2">
              {contentType === 'video' ? (
                <Video className="w-5 h-5" />
              ) : (
                <ImageIcon className="w-5 h-5" />
              )}
            </div>
            <p className="text-sm font-bold text-[#061B46]">
              {contentType === 'video' ? 'Upload Video / Reel' : 'Upload Photos / Videos'}
            </p>
            <p className="text-xs text-[#667085] mt-0.5">
              Showcase your business, offer or update.
            </p>
          </button>

          {/* Uploaded Media Previews + Add (+) Tile */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="relative w-24 h-20 rounded-xl overflow-hidden border border-[#EADBC2] shrink-0 bg-[#061B46]"
              >
                <SafeImage
                  src={item.thumbnailUrl || item.url}
                  alt="Selected media preview"
                  className="w-full h-full object-cover"
                />
                {item.type === 'video' && (
                  <>
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center pointer-events-none">
                      <span className="w-7 h-7 rounded-full bg-black/60 border border-white flex items-center justify-center text-white">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </span>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-semibold tabular-nums">
                      {item.duration || '0:30'}
                    </span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(item.id)}
                  aria-label="Remove selected media"
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white text-[#061B46] shadow flex items-center justify-center hover:bg-red-50 hover:text-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Add more media"
              className="w-24 h-20 rounded-xl border border-[#EADBC2] bg-[#FBF1E0]/60 hover:bg-[#FBF1E0] flex items-center justify-center text-[#061B46] shrink-0 transition-colors cursor-pointer"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Business Selector (for quick advertisement linking) */}
          <div>
            <label className="block text-xs font-bold text-[#061B46] mb-1">
              Publish As Business / Member
            </label>
            <select
              value={selectedBusinessId}
              onChange={(e) => handleBusinessSelect(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.category})
                </option>
              ))}
              <option value="personal">{user.fullName} (Personal Post)</option>
            </select>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-xs font-bold text-[#061B46] mb-1">
              Business Name <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Krishna Biryani House"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
            />
          </div>

          {/* Advertisement Description */}
          <div>
            <label className="block text-xs font-bold text-[#061B46] mb-1">
              Description <span className="text-[#E11D48]">*</span>
            </label>
            <div className="relative">
              <textarea
                rows={3}
                maxLength={maxChars}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your special offer, event details, or community update..."
                className="w-full px-3.5 py-2.5 pb-6 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] resize-none focus:outline-none focus:border-[#0B347A]"
              />
              <span className="absolute bottom-2 right-3 text-[11px] text-[#667085] tabular-nums">
                {description.length}/{maxChars}
              </span>
            </div>
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#061B46] mb-1">
                Category
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-[#D99B27] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                >
                  {BUSINESS_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                  <option value="Events">Events</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#061B46] mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#D99B27] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Hyderabad, Telangana"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                />
              </div>
            </div>
          </div>

          {/* Event Extra Fields */}
          {contentType === 'event' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#061B46] mb-1">
                  Event Date &amp; Time
                </label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Sat, Nov 28 · 6:00 PM"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#061B46] mb-1">
                  Event Venue
                </label>
                <input
                  type="text"
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  placeholder="Venue name & neighborhood"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                />
              </div>
            </div>
          )}

          {/* Contact & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#061B46] mb-1">
                Contact Information
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#D99B27] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="+91 98492 77810"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#061B46] mb-1">
                Website / Promo Link
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourbusiness.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EADBC2] text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
              />
            </div>
          </div>

          {/* Primary CTA: Post to Community */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-royal-pill text-white font-semibold text-sm shadow-[0_6px_18px_rgba(11,52,122,0.32)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing...' : 'Post to Community'}</span>
          </button>
        </form>
      </div>

      {/* Peacock Feathers Bottom Corners */}
      <PeacockCornerDecorations />
    </div>
  );
};
