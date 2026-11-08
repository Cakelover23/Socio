import { useState } from "react";

type Tab = "compose" | "feeds" | "messages" | "ai";
type Platform = "Discord" | "Instagram" | "Facebook" | "LinkedIn" | "Snapchat";

const platforms: { name: Platform; icon: string; color: string }[] = [
  { name: "Discord", icon: "/assets/discord.png", color: "#406761" },
  { name: "Instagram", icon: "/assets/instagram.png", color: "#75CEBC" },
  { name: "Facebook", icon: "/assets/facebook.png", color: "#1D8575" },
  { name: "LinkedIn", icon: "/assets/linkedin.png", color: "#1D8575" },
  { name: "Snapchat", icon: "/assets/snapchat.png", color: "#A7DED3" },
];

const initialPosts = [
  {
    id: 5,
    platform: "LinkedIn" as Platform,
    author: "The Slow Edit",
    handle: "Shared an article",
    time: "8 min",
    body: "A practical guide to building a calmer relationship with your phone",
    color: "#1D8575",
    initials: "SE",
    avatar: "/assets/editor-profile.jpg",
    likes: 1240,
    comments: 86,
    link: {
      domain: "humanetech.com",
      description: "Small, intentional changes that help technology work for you—not the other way around.",
      image: "/assets/digital-wellbeing-link.jpg",
      href: "https://www.humanetech.com/take-control",
      alt: "Headphones, a smartphone, and a laptop arranged on a wooden desk",
    },
    photo: null,
  },
  {
    id: 1,
    platform: "Instagram" as Platform,
    author: "Maya Chen",
    handle: "@mayamakes",
    time: "12 min",
    body: "A quiet morning, a fresh sketchbook, and finally enough space to think. What are you making today?",
    color: "#75CEBC",
    initials: "MC",
    avatar: "/assets/maya-profile.jpg",
    likes: 84,
    comments: 12,
    link: null,
    photo: {
      src: "/assets/sketchbook-post.jpg",
      alt: "An open sketchbook resting on a sunlit desk",
    },
  },
  {
    id: 2,
    platform: "Facebook" as Platform,
    author: "Local Run Club",
    handle: "Community group",
    time: "38 min",
    body: "Saturday’s route is live. Meet at the west gate at 8:00 AM — coffee is on us after the final mile.",
    color: "#1D8575",
    initials: "LR",
    avatar: "/assets/run-club-post.jpg",
    likes: 31,
    comments: 7,
    link: null,
    photo: {
      src: "/assets/run-club-post.jpg",
      alt: "A group of runners crossing a field beside trees",
    },
  },
  {
    id: 6,
    platform: "Discord" as Platform,
    author: "Weekend Walkers",
    handle: "Shared in #outside",
    time: "46 min",
    body: "A beginner’s guide to finding better local trails",
    color: "#406761",
    initials: "WW",
    avatar: "/assets/trail-link.jpg",
    likes: 318,
    comments: 24,
    link: {
      domain: "nps.gov",
      description: "Explore trail basics, plan ahead, and find a quieter route for your next screen-free afternoon.",
      image: "/assets/trail-link.jpg",
      href: "https://www.nps.gov/subjects/trails/index.htm",
      alt: "A quiet dirt trail running through a green forest",
    },
    photo: null,
  },
  {
    id: 3,
    platform: "Snapchat" as Platform,
    author: "Alex Morgan",
    handle: "@alexm",
    time: "1 hr",
    body: "The best productivity system is the one that gives you more time away from it.",
    color: "#A7DED3",
    initials: "AM",
    avatar: "/assets/alex-profile.jpg",
    likes: 126,
    comments: 19,
    link: null,
    photo: {
      src: "/assets/quiet-reading-post.jpg",
      alt: "A person reading quietly outside beside the water",
    },
  },
  {
    id: 4,
    platform: "LinkedIn" as Platform,
    author: "Nadia Patel",
    handle: "Product designer",
    time: "2 hr",
    body: "Small teams do their best work when clarity replaces urgency. A few notes from our latest launch.",
    color: "#B7D0CA",
    initials: "NP",
    avatar: "/assets/nadia-profile.jpg",
    likes: 57,
    comments: 8,
    link: null,
    photo: {
      src: "/assets/design-workshop-post.jpg",
      alt: "A design team brainstorming with notes on a glass wall",
    },
  },
  {
    id: 7,
    platform: "Discord" as Platform,
    author: "Jordan Lee",
    handle: "Shared in #book-club",
    time: "1 hr",
    body: "Finished chapter nine on the train this morning — the bit about slow mornings hit different without my phone in hand.",
    color: "#406761",
    initials: "JL",
    avatar: "/assets/jordan-profile.jpg",
    likes: 22,
    comments: 5,
    link: null,
    photo: null,
  },
  {
    id: 8,
    platform: "Snapchat" as Platform,
    author: "Sam Rivera",
    handle: "@samrivera",
    time: "1 hr",
    body: "Found this spot on today’s walk. Zero notifications, just birdsong.",
    color: "#A7DED3",
    initials: "SR",
    avatar: "/assets/sam-profile.jpg",
    likes: 95,
    comments: 11,
    link: null,
    photo: {
      src: "/assets/quiet-reading-post.jpg",
      alt: "A quiet path beside the water with soft afternoon light",
    },
  },
  {
    id: 9,
    platform: "Facebook" as Platform,
    author: "Leah Kim",
    handle: "Updated her status",
    time: "3 hr",
    body: "Hosting a small potluck Friday evening — bring a dish, leave your notifications at the door. All welcome!",
    color: "#1D8575",
    initials: "LK",
    avatar: "/assets/leah-profile.jpg",
    likes: 44,
    comments: 15,
    link: null,
    photo: null,
  },
  {
    id: 10,
    platform: "Instagram" as Platform,
    author: "The Quiet Collective",
    handle: "Shared a resource",
    time: "4 hr",
    body: "New piece on building a gentler feed",
    color: "#75CEBC",
    initials: "QC",
    avatar: "/assets/editor-profile.jpg",
    likes: 203,
    comments: 18,
    link: {
      domain: "offscreen.studio",
      description: "Why curating who you follow matters more than cutting screen time in half.",
      image: "/assets/digital-wellbeing-link.jpg",
      href: "https://offscreen.studio/gentler-feed",
      alt: "A phone resting face-down on a linen tablecloth beside a cup of tea",
    },
    photo: null,
  },
];

const conversations = [
  {
    name: "Jordan Lee",
    platform: "Instagram",
    initials: "JL",
    avatar: "/assets/jordan-profile.jpg",
    time: "2m",
    unread: 2,
    group: false,
    messages: [
      { from: "them", text: "Are we still on for Thursday?" },
      { from: "me", text: "Absolutely. How does 10:30 sound?" },
      { from: "them", text: "That works for me — see you then!" },
      { from: "them", text: "Should I bring anything?" },
      { from: "me", text: "Just yourself — coffee’s on me." },
    ],
    otherThreads: [
      {
        platform: "Facebook",
        messages: [
          { from: "them", text: "I added the event details to the group page." },
          { from: "me", text: "Thanks. I’ll check the guest list tonight." },
          { from: "them", text: "Perfect — we already have twelve people confirmed." },
        ],
      },
      {
        platform: "LinkedIn",
        messages: [
          { from: "me", text: "It was great meeting you at the product meetup." },
          { from: "them", text: "Likewise. Your point about calmer software really stayed with me." },
          { from: "them", text: "Would you be open to a quick call next week?" },
        ],
      },
    ],
  },
  {
    name: "Design Circle",
    platform: "Discord",
    initials: "DC",
    avatar: "/assets/sketchbook-post.jpg",
    time: "18m",
    unread: 4,
    group: true,
    messages: [
      { from: "them", text: "Mina shared a new file in the project channel." },
      { from: "me", text: "Great, I’ll review it this afternoon." },
      { from: "them", text: "Perfect. Add your notes whenever you’re ready." },
      { from: "them", text: "Also — we moved Thursday’s critique to 4 PM." },
      { from: "me", text: "Got it, I’ll be there." },
    ],
    otherThreads: [],
  },
  {
    name: "Sam Rivera",
    platform: "Facebook",
    initials: "SR",
    avatar: "/assets/sam-profile.jpg",
    time: "1h",
    unread: 0,
    group: false,
    messages: [
      { from: "them", text: "The photos from Saturday look great." },
      { from: "me", text: "I’m glad you like them. I made a shared album." },
      { from: "them", text: "Could you send me the link?" },
    ],
    otherThreads: [
      {
        platform: "Snapchat",
        messages: [
          { from: "them", text: "Found a great quiet spot for our walk today." },
          { from: "me", text: "Send me the pin, I’m in." },
          { from: "them", text: "On its way." },
        ],
      },
    ],
  },
  {
    name: "Leah Kim",
    platform: "LinkedIn",
    initials: "LK",
    avatar: "/assets/leah-profile.jpg",
    time: "3h",
    unread: 0,
    group: false,
    messages: [
      { from: "me", text: "I thought you two would have a lot to discuss." },
      { from: "them", text: "We had a wonderful conversation this morning." },
      { from: "them", text: "Thanks for the introduction." },
    ],
    otherThreads: [],
  },
  {
    name: "Weekend Plans",
    platform: "Instagram",
    initials: "WP",
    avatar: "/assets/run-club-post.jpg",
    time: "5h",
    unread: 1,
    group: true,
    messages: [
      { from: "them", text: "Beach day or the new exhibit?" },
      { from: "me", text: "I’m leaning toward the exhibit if everyone’s free." },
      { from: "them", text: "Let’s decide by Friday." },
    ],
    otherThreads: [],
  },
  {
    name: "Priya Shah",
    platform: "Snapchat",
    initials: "PS",
    avatar: "/assets/alex-profile.jpg",
    time: "7h",
    unread: 0,
    group: false,
    messages: [
      { from: "them", text: "Loved your trail photo from this morning." },
      { from: "me", text: "Thanks! It was the quietest start to a day in weeks." },
      { from: "them", text: "Which trailhead was that?" },
    ],
    otherThreads: [],
  },
  {
    name: "Marcus Webb",
    platform: "LinkedIn",
    initials: "MW",
    avatar: "/assets/editor-profile.jpg",
    time: "9h",
    unread: 1,
    group: false,
    messages: [
      { from: "them", text: "Enjoyed your comment on the digital wellbeing piece." },
      { from: "them", text: "Would you be open to co-writing a follow-up?" },
      { from: "me", text: "Definitely — let’s set up a time next week." },
    ],
    otherThreads: [],
  },
];

type TrackedPerson = {
  id: number;
  name: string;
  avatar?: string;
  note?: string;
  accounts: { platform: Platform; handle: string }[];
};

const knownContacts: { name: string; avatar: string; platforms: Platform[] }[] = (() => {
  const map = new Map<string, { avatar: string; platforms: Set<Platform> }>();
  const add = (name: string, platform: Platform, avatar: string) => {
    if (name === "You") return;
    const entry = map.get(name) ?? { avatar, platforms: new Set<Platform>() };
    entry.platforms.add(platform);
    map.set(name, entry);
  };
  initialPosts.forEach((post) => add(post.author, post.platform, post.avatar));
  conversations.forEach((conversation) => {
    if (conversation.group) return;
    add(conversation.name, conversation.platform as Platform, conversation.avatar);
    conversation.otherThreads.forEach((thread) => add(conversation.name, thread.platform as Platform, conversation.avatar));
  });
  return Array.from(map.entries()).map(([name, { avatar, platforms }]) => ({
    name,
    avatar,
    platforms: Array.from(platforms),
  }));
})();

const initialTrackedPeople: TrackedPerson[] = [
  {
    id: 1,
    name: "Jordan Lee",
    avatar: "/assets/jordan-profile.jpg",
    note: "College friend",
    accounts: [
      { platform: "Instagram", handle: "@jordanlee" },
      { platform: "Facebook", handle: "Jordan Lee" },
      { platform: "LinkedIn", handle: "Jordan Lee" },
      { platform: "Discord", handle: "jordan.lee" },
    ],
  },
];

const PERSON_SUMMARIES: Record<string, string> = {
  "Jordan Lee": "Confirmed Thursday plans on Instagram, posted in #book-club on Discord, added event details on Facebook, and asked for a quick call on LinkedIn — all within the last day.",
};

type FeedComment = {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  replyTo?: number;
};

const initialComments: Record<number, FeedComment[]> = {
  1: [
    { id: 101, author: "Leah Kim", avatar: "/assets/leah-profile.jpg", text: "This is exactly the kind of morning I need more of.", time: "6 min", likes: 8 },
    { id: 102, author: "Sam Rivera", avatar: "/assets/sam-profile.jpg", text: "What kind of sketchbook are you using?", time: "3 min", likes: 2, replyTo: 101 },
  ],
  2: [
    { id: 201, author: "Jordan Lee", avatar: "/assets/jordan-profile.jpg", text: "Count me in. I’ll bring a friend too.", time: "21 min", likes: 5 },
    { id: 202, author: "Nadia Patel", avatar: "/assets/nadia-profile.jpg", text: "Is there a shorter route for beginners?", time: "14 min", likes: 3 },
  ],
  3: [
    { id: 301, author: "Maya Chen", avatar: "/assets/maya-profile.jpg", text: "Saving this as my reminder for the week.", time: "42 min", likes: 16 },
  ],
  4: [
    { id: 401, author: "Jordan Lee", avatar: "/assets/jordan-profile.jpg", text: "Clarity over urgency is such a useful framing.", time: "1 hr", likes: 11 },
    { id: 402, author: "Leah Kim", avatar: "/assets/leah-profile.jpg", text: "Would love to read the longer notes from your launch.", time: "48 min", likes: 4 },
  ],
  5: [
    { id: 501, author: "Nadia Patel", avatar: "/assets/nadia-profile.jpg", text: "Turning off non-human notifications made the biggest difference for me.", time: "4 min", likes: 23 },
    { id: 502, author: "Alex Morgan", avatar: "/assets/alex-profile.jpg", text: "The scheduled summary idea is so much calmer.", time: "2 min", likes: 9 },
  ],
  6: [
    { id: 601, author: "Sam Rivera", avatar: "/assets/sam-profile.jpg", text: "The river loop is quiet this time of year.", time: "31 min", likes: 7 },
    { id: 602, author: "Maya Chen", avatar: "/assets/maya-profile.jpg", text: "Adding this one to our weekend list.", time: "19 min", likes: 5 },
  ],
  7: [
    { id: 701, author: "Leah Kim", avatar: "/assets/leah-profile.jpg", text: "That chapter wrecked me too. No notes, just felt it.", time: "48 min", likes: 6 },
    { id: 702, author: "Alex Morgan", avatar: "/assets/alex-profile.jpg", text: "Adding it to my list this week.", time: "35 min", likes: 2, replyTo: 701 },
  ],
  8: [
    { id: 801, author: "Maya Chen", avatar: "/assets/maya-profile.jpg", text: "This is stunning — where is this exactly?", time: "40 min", likes: 9 },
    { id: 802, author: "Nadia Patel", avatar: "/assets/nadia-profile.jpg", text: "Needed this view today, thank you.", time: "22 min", likes: 4 },
  ],
  9: [
    { id: 901, author: "Jordan Lee", avatar: "/assets/jordan-profile.jpg", text: "We'll be there! Bringing the lemon bars.", time: "2 hr", likes: 10 },
    { id: 902, author: "Sam Rivera", avatar: "/assets/sam-profile.jpg", text: "Love the phone-free rule, counting us in too.", time: "1 hr", likes: 7 },
  ],
  10: [
    { id: 1001, author: "Nadia Patel", avatar: "/assets/nadia-profile.jpg", text: "Curating who you follow really is underrated advice.", time: "3 hr", likes: 14 },
    { id: 1002, author: "Alex Morgan", avatar: "/assets/alex-profile.jpg", text: "Saving this one to reread later.", time: "2 hr", likes: 6 },
  ],
};

function PlatformMark({ name, small = false }: { name: Platform | string; small?: boolean }) {
  const platform = platforms.find((item) => item.name === name) ?? platforms[0];
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-[10px] border border-[#13332E]/10 bg-white ${small ? "size-7" : "size-10"}`}
      aria-label={platform.name}
    >
      <img
        src={platform.icon}
        alt=""
        className="size-full object-cover"
      />
    </span>
  );
}

function CommentsSection({
  postId,
  open,
  onClose,
  onCommentAdded,
}: {
  postId: number;
  open: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
}) {
  const [comments, setComments] = useState<FeedComment[]>(initialComments[postId] ?? []);
  const [draft, setDraft] = useState("");
  const [replyingTo, setReplyingTo] = useState<FeedComment | null>(null);
  const [likedComments, setLikedComments] = useState<number[]>([]);

  const submitComment = () => {
    if (!draft.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        author: "Ingrid Solheim",
        avatar: "/assets/ingrid-profile.png",
        text: draft.trim(),
        time: "now",
        likes: 0,
        replyTo: replyingTo?.id,
      },
    ]);
    setDraft("");
    setReplyingTo(null);
    onCommentAdded();
  };

  if (!open) return null;

  return (
    <section className="mt-5 border-t border-[#CADFD9] pt-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-[13px]">Comments</h4>
          <p className="mt-1 text-[9px] text-[#6D8F88]">Join the conversation across networks</p>
        </div>
        <button onClick={onClose} className="rounded-full px-3 py-2 text-[10px] text-[#557A73] hover:bg-[#F1F8F6]">
          Close
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {comments.length === 0 && (
          <div className="rounded-[14px] bg-[#DBEBE7] px-4 py-6 text-center">
            <p className="text-[11px] text-[#557A73]">No comments yet. Start the conversation.</p>
          </div>
        )}
        {comments.map((comment) => {
          const liked = likedComments.includes(comment.id);
          return (
            <div key={comment.id} className={`flex gap-3 ${comment.replyTo ? "ml-8 border-l border-[#B7D0CA] pl-4" : ""}`}>
              <img src={comment.avatar} alt="" className="size-8 shrink-0 rounded-full border border-[#13332E]/10 object-cover" />
              <div className="min-w-0 flex-1">
                <div className="rounded-[14px] bg-[#DBEBE7] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[11px] text-[#13332E]">{comment.author}</p>
                    <span className="shrink-0 text-[9px] text-[#6D8F88]">{comment.time}</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#406761]">{comment.text}</p>
                </div>
                <div className="mt-1.5 flex gap-4 pl-2 text-[9px] text-[#557A73]">
                  <button
                    onClick={() => setLikedComments(liked ? likedComments.filter((id) => id !== comment.id) : [...likedComments, comment.id])}
                    className={liked ? "text-[#04B89C]" : "hover:text-[#13332E]"}
                  >
                    {liked ? "Liked" : "Like"} · {comment.likes + (liked ? 1 : 0)}
                  </button>
                  <button
                    onClick={() => {
                      setReplyingTo(comment);
                      setDraft("");
                    }}
                    className="hover:text-[#13332E]"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitComment();
        }}
        className="mt-5 flex items-end gap-2"
      >
        <img src="/assets/ingrid-profile.png" alt="" className="mb-1 size-8 shrink-0 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          {replyingTo && (
            <div className="mb-2 flex items-center justify-between rounded-[10px] bg-[#E8F3F0] px-3 py-2 text-[9px] text-[#04B89C]">
              <span>Replying to {replyingTo.author}</span>
              <button type="button" onClick={() => setReplyingTo(null)}>Cancel</button>
            </div>
          )}
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={replyingTo ? `Reply to ${replyingTo.author}…` : "Write a comment…"}
              className="min-w-0 flex-1 rounded-[12px] border border-[#B7D0CA] bg-white px-4 py-3 text-[11px] outline-none focus:border-[#04B89C]"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="rounded-[12px] bg-[#04B89C] px-4 text-[10px] text-white transition hover:bg-[#1D8575] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function AppHeader({
  tab,
  onMenu,
  filtersSlot,
}: {
  tab: Tab;
  onMenu: () => void;
  filtersSlot?: React.ReactNode;
}) {
  const titles: Record<Tab, string> = { compose: "New Post", feeds: "Feeds", messages: "Messages", ai: "AI Insights" };
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#CADFD9] bg-[#F1F8F6]/95 px-5 backdrop-blur-xl md:px-8">
      <div className="flex items-center">{filtersSlot}</div>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-[15px] tracking-[-0.01em]">{titles[tab]}</h1>
      <button
        onClick={onMenu}
        className="relative grid size-9 place-items-center rounded-full border border-[#B7D0CA] bg-white text-[#406761] transition hover:border-[#0D2521] hover:text-[#0D2521]"
        aria-label="Open menu"
      >
        <UiIcon name="menu" />
        <span className="absolute right-0 top-0 size-2 rounded-full bg-[#04B89C]" />
      </button>
    </header>
  );
}

function FeedFilters({
  selectedPlatforms,
  onToggle,
}: {
  selectedPlatforms: Platform[];
  onToggle: (platform: Platform | "All") => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] transition ${
          selectedPlatforms.length > 0
            ? "border-[#1D8575] bg-[#1D8575] text-white"
            : "border-[#CADFD9] bg-white text-[#13332E] hover:border-[#1D8575]"
        }`}
      >
        <UiIcon name="filter" className="size-4" />
        Filters
        {selectedPlatforms.length > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-white/25 text-[10px]">{selectedPlatforms.length}</span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute left-0 top-full z-20 mt-2 w-[min(320px,calc(100vw-2rem))] rounded-[18px] border border-[#CADFD9] bg-white p-3 shadow-[0_18px_40px_rgba(19,51,46,0.15)]">
            <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.16em] text-[#6D8F88]">Show posts from</p>
            <div className="flex flex-wrap gap-2 px-1">
              {["All", ...platforms.map((item) => item.name)].map((item) => (
                <button
                  key={item}
                  onClick={() => onToggle(item as Platform | "All")}
                  data-platform={item}
                  data-active={item === "All" ? selectedPlatforms.length === 0 : selectedPlatforms.includes(item as Platform)}
                  aria-pressed={item === "All" ? selectedPlatforms.length === 0 : selectedPlatforms.includes(item as Platform)}
                  className="platform-filter shrink-0 rounded-full border px-4 py-2 text-xs transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MenuDrawer({
  open,
  onClose,
  onProfile,
  onSettings,
  onDigest,
  unreadCount,
}: {
  open: boolean;
  onClose: () => void;
  onProfile: () => void;
  onSettings: () => void;
  onDigest: () => void;
  unreadCount: number;
}) {
  const items: { label: string; detail: string; icon: UiIconName; onClick: () => void; badge?: number }[] = [
    { label: "Profile", detail: "Connected accounts & details", icon: "user", onClick: onProfile },
    { label: "Notifications", detail: "Your grouped summary", icon: "bell", onClick: onDigest, badge: unreadCount },
    { label: "Settings", detail: "Appearance & preferences", icon: "settings", onClick: onSettings },
  ];

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#0D2521]/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Account menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[340px] flex-col bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.3)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[16px]">Menu</h2>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-full border border-[#B7D0CA] bg-white text-[#406761] transition hover:border-[#0D2521] hover:text-[#0D2521]" aria-label="Close menu">
            <UiIcon name="close" />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-[17px] bg-[#F1F8F6] p-4">
          <img src="/assets/ingrid-profile.png" alt="Ingrid Solheim" className="size-11 shrink-0 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">Ingrid Solheim</p>
            <p className="mt-0.5 truncate text-[10px] text-[#557A73]">@ingridsol</p>
          </div>
        </div>

        <nav className="mt-5 space-y-2">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex w-full items-center gap-3 rounded-[15px] border border-[#CADFD9] p-3 text-left transition hover:border-[#86A69F] hover:bg-[#F1F8F6]"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#E8F3F0] text-[#1D8575]">
                <UiIcon name={item.icon} className="size-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">{item.label}</p>
                <p className="mt-0.5 truncate text-[10px] text-[#557A73]">{item.detail}</p>
              </div>
              {!!item.badge && (
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#04B89C] text-[9px] text-white">
                  {item.badge}
                </span>
              )}
              <UiIcon name="chevronRight" className="size-4 shrink-0 text-[#86A69F]" />
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

function SettingsView({
  nightMode,
  onThemeChange,
  onBack,
}: {
  nightMode: boolean;
  onThemeChange: (night: boolean) => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-dvh bg-[#1D8575] pb-10 [font-family:'Manrope:Medium',sans-serif]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#1D8575]/95 px-4 text-white backdrop-blur-xl md:px-8">
        <button onClick={onBack} className="rounded-full border border-white/20 px-4 py-2 text-[11px] transition hover:bg-white/10">
          <span aria-hidden="true">←</span> Back
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[14px]">Settings</h1>
        <span className="rounded-full bg-white/10 px-4 py-2 text-[10px] text-white/75">Preferences</span>
      </header>

      <div className="mx-auto w-full max-w-[820px] px-4 py-5 md:px-8 md:py-8">
        <section className="rounded-[22px] bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.2)] md:p-7">
          <div className="border-b border-[#CADFD9] pb-6">
            <p className="text-[10px] uppercase tracking-[0.17em] text-[#86A69F]">Appearance</p>
            <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.03em] text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
              Choose how Quietly looks
            </h2>
            <p className="mt-2 text-[11px] leading-relaxed text-[#557A73]">
              Night mode uses darker surfaces and softer contrast for low-light browsing.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => onThemeChange(false)}
              aria-pressed={!nightMode}
              className={`rounded-[18px] border p-4 text-left transition ${
                !nightMode ? "border-[#04B89C] bg-[#F1F8F6] ring-1 ring-[#04B89C]" : "border-[#B7D0CA] bg-white hover:border-[#86A69F]"
              }`}
            >
              <div className="theme-preview-light rounded-[13px] border border-[#B7D0CA] bg-[#F1F8F6] p-3">
                <div className="h-2 w-16 rounded-full bg-[#1D8575]" />
                <div className="mt-3 space-y-2">
                  <div className="theme-preview-light-card h-7 rounded-[8px] bg-white shadow-sm" />
                  <div className="theme-preview-light-card h-7 rounded-[8px] bg-white shadow-sm" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-[#1D8575]">Light mode</p>
                  <p className="mt-1 text-[9px] text-[#6D8F88]">Bright and airy</p>
                </div>
                {!nightMode && <span className="grid size-6 place-items-center rounded-full bg-[#04B89C] text-[10px] text-white">✓</span>}
              </div>
            </button>

            <button
              onClick={() => onThemeChange(true)}
              aria-pressed={nightMode}
              className={`rounded-[18px] border p-4 text-left transition ${
                nightMode ? "border-[#36C4AA] bg-[#13332E] ring-1 ring-[#36C4AA]" : "border-[#B7D0CA] bg-white hover:border-[#86A69F]"
              }`}
            >
              <div className="rounded-[13px] border border-[#22524B] bg-[#13332E] p-3">
                <div className="h-2 w-16 rounded-full bg-[#36C4AA]" />
                <div className="mt-3 space-y-2">
                  <div className="h-7 rounded-[8px] bg-[#13332E]" />
                  <div className="h-7 rounded-[8px] bg-[#13332E]" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className={nightMode ? "text-[12px] text-white" : "text-[12px] text-[#1D8575]"}>Night mode</p>
                  <p className={nightMode ? "mt-1 text-[9px] text-white/55" : "mt-1 text-[9px] text-[#6D8F88]"}>Comfortable in low light</p>
                </div>
                {nightMode && <span className="grid size-6 place-items-center rounded-full bg-[#36C4AA] text-[10px] text-white">✓</span>}
              </div>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-[16px] bg-[#DBEBE7] p-4">
            <div>
              <p className="text-[11px] text-[#1D8575]">Night mode</p>
              <p className="mt-1 text-[9px] text-[#6D8F88]">{nightMode ? "Currently on" : "Currently off"} · saved on this device</p>
            </div>
            <button
              onClick={() => onThemeChange(!nightMode)}
              role="switch"
              aria-checked={nightMode}
              className={`relative h-7 w-12 rounded-full transition ${nightMode ? "bg-[#04B89C]" : "bg-[#9FBCB5]"}`}
              aria-label="Toggle night mode"
            >
              <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition ${nightMode ? "left-6" : "left-1"}`} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ProfileView({
  connected,
  onToggleAccount,
  onBack,
}: {
  connected: Platform[];
  onToggleAccount: (platform: Platform) => void;
  onBack: () => void;
}) {
  const [connectingPlatform, setConnectingPlatform] = useState<Platform | null>(null);
  const [connectStep, setConnectStep] = useState<1 | 2 | 3>(1);
  const [accountName, setAccountName] = useState("");
  const [permissions, setPermissions] = useState(["Feed & posts", "Messages", "Notification summaries"]);
  const handles: Partial<Record<Platform, string>> = {
    Instagram: "@ingridsol",
    LinkedIn: "Ingrid Solheim",
    Facebook: "Ingrid Solheim",
    Snapchat: "@ingrids",
    Discord: "ingrid.s",
  };
  const connectionDetails = platforms.find((platform) => platform.name === connectingPlatform);

  const beginConnection = (platform: Platform) => {
    setConnectingPlatform(platform);
    setConnectStep(1);
    setAccountName("");
    setPermissions(["Feed & posts", "Messages", "Notification summaries"]);
  };

  const closeConnection = () => {
    setConnectingPlatform(null);
    setConnectStep(1);
    setAccountName("");
  };

  return (
    <div className="min-h-dvh bg-[#1D8575] pb-10 [font-family:'Manrope:Medium',sans-serif]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#1D8575]/95 px-4 text-white backdrop-blur-xl md:px-8">
        <button
          onClick={onBack}
          className="rounded-full border border-white/20 px-4 py-2 text-[11px] transition hover:bg-white/10"
        >
          <span aria-hidden="true">←</span> Back
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[14px]">Profile</h1>
        <span className="rounded-full bg-white/10 px-4 py-2 text-[10px] text-white/75">Your profile</span>
      </header>

      <div className="mx-auto grid w-full max-w-[1120px] gap-5 px-4 py-5 md:grid-cols-[320px_minmax(0,1fr)] md:px-8 md:py-8">
        <aside className="space-y-5">
          <section className="rounded-[22px] bg-white p-6 text-center shadow-[0_20px_55px_rgba(13,37,33,0.2)]">
            <img
              src="/assets/ingrid-profile.png"
              alt="Ingrid Solheim"
              className="mx-auto size-32 rounded-full object-cover"
            />
            <h2 className="mt-5 text-[25px] font-extrabold tracking-[-0.035em] text-[#04B89C] [font-family:'Manrope:ExtraBold',sans-serif]">
              Ingrid Solheim
            </h2>
            <p className="mt-2 text-[12px] text-[#557A73]">BSc student · Trondheim, Norway</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Practical", "Social", "Tech-savvy"].map((trait) => (
                <span key={trait} className="rounded-full bg-[#DBEBE7] px-3 py-2 text-[10px] text-[#22524B]">
                  {trait}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[20px] bg-white p-5 text-[#22524B]">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#86A69F]">Account health</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-[24px] font-extrabold text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">{connected.length}</p>
                <p className="mt-1 text-[11px] text-[#557A73]">social accounts connected</p>
              </div>
              <div className="grid size-10 place-items-center rounded-full bg-[#F1F8F6] text-[11px] text-[#04B89C]">
                {connected.length}/5
              </div>
            </div>
          </section>
        </aside>

        <section className="rounded-[22px] bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.2)] md:p-7">
          <div className="flex flex-col gap-3 border-b border-[#CADFD9] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-[#86A69F]">Social connections</p>
              <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.03em] text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
                Add your accounts
              </h2>
              <p className="mt-2 max-w-lg text-[11px] leading-relaxed text-[#557A73]">
                Connect your networks to bring posts and messages into one calmer place.
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#E8F3F0] px-3 py-2 text-[9px] text-[#04B89C]">
              Private by default
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {platforms.map((platform) => {
              const isConnected = connected.includes(platform.name);
              return (
                <div
                  key={platform.name}
                  className={`flex items-center gap-3 rounded-[17px] border p-3 transition ${
                    isConnected ? "border-[#DBEBE7] bg-[#F1F8F6]" : "border-[#CADFD9] bg-white"
                  }`}
                >
                  <PlatformMark name={platform.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">{platform.name}</p>
                      {isConnected && <span className="size-1.5 rounded-full bg-[#04B89C]" />}
                    </div>
                    <p className="mt-1 truncate text-[10px] text-[#6D8F88]">
                      {isConnected ? handles[platform.name] : "No account connected"}
                    </p>
                  </div>
                  <button
                    onClick={() => isConnected ? onToggleAccount(platform.name) : beginConnection(platform.name)}
                    className={`rounded-full px-4 py-2.5 text-[10px] transition ${
                      isConnected
                        ? "border border-[#B7D0CA] bg-white text-[#557A73] hover:border-[#86A69F] hover:text-[#22524B]"
                        : "bg-[#04B89C] text-white hover:bg-[#1D8575]"
                    }`}
                  >
                    {isConnected ? "Remove" : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-[17px] bg-[#DBEBE7] p-4">
            <p className="text-[11px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">You stay in control</p>
            <p className="mt-2 text-[10px] leading-relaxed text-[#557A73]">
              Quietly only uses connected accounts to show your feed, messages, and scheduled summaries. You can remove access at any time.
            </p>
          </div>
        </section>
      </div>

      {connectingPlatform && connectionDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#13332E]/75 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="connect-account-title"
              className="w-full max-w-[480px] rounded-[24px] bg-white p-5 shadow-[0_30px_80px_rgba(13,37,33,0.4)] md:p-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PlatformMark name={connectingPlatform} />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#86A69F]">Add account</p>
                    <h2 id="connect-account-title" className="mt-1 text-[17px] font-extrabold text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
                      Connect {connectingPlatform}
                    </h2>
                  </div>
                </div>
                <button onClick={closeConnection} className="grid size-9 place-items-center rounded-full bg-[#DBEBE7] text-[15px] text-[#557A73]" aria-label="Close account connection">
                  ×
                </button>
              </div>

              <div className="mt-6 flex gap-2">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={`h-1.5 flex-1 rounded-full transition ${connectStep >= step ? "bg-[#04B89C]" : "bg-[#CADFD9]"}`}
                  />
                ))}
              </div>

              {connectStep === 1 && (
                <div className="mt-6">
                  <h3 className="text-[15px] text-[#1D8575]">Which account would you like to add?</h3>
                  <p className="mt-2 text-[10px] leading-relaxed text-[#557A73]">
                    Enter a username or profile name so Quietly can identify the right account.
                  </p>
                  <div className="mt-5 rounded-[13px] border border-[#B7D0CA] bg-[#F1F8F6] p-3">
                    <p className="text-[9px] leading-relaxed text-[#557A73]">
                      Prototype only — no real login or password is requested.
                    </p>
                  </div>
                  <label className="mt-5 block text-[10px] text-[#406761]" htmlFor="social-account-name">
                    Username or profile name
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[11px] text-[#86A69F]">@</span>
                    <input
                      id="social-account-name"
                      autoFocus
                      value={accountName}
                      onChange={(event) => setAccountName(event.target.value)}
                      placeholder="your.account"
                      className="w-full rounded-[13px] border border-[#B7D0CA] bg-white py-3.5 pl-9 pr-4 text-[12px] outline-none focus:border-[#04B89C]"
                    />
                  </div>
                  <button
                    onClick={() => setConnectStep(2)}
                    disabled={!accountName.trim()}
                    className="mt-6 w-full rounded-[13px] bg-[#04B89C] px-5 py-3.5 text-[11px] text-white transition hover:bg-[#1D8575] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Continue
                  </button>
                </div>
              )}

              {connectStep === 2 && (
                <div className="mt-6">
                  <h3 className="text-[15px] text-[#1D8575]">Choose what to bring into Quietly</h3>
                  <p className="mt-2 text-[10px] leading-relaxed text-[#557A73]">
                    You can change these permissions or remove the account at any time.
                  </p>
                  <div className="mt-5 space-y-2">
                    {[
                      { name: "Feed & posts", detail: "See posts from this account in your unified feed." },
                      { name: "Messages", detail: "Read and reply from the central inbox." },
                      { name: "Notification summaries", detail: "Include important alerts in AI summaries." },
                    ].map((permission) => {
                      const selected = permissions.includes(permission.name);
                      return (
                        <button
                          key={permission.name}
                          onClick={() =>
                            setPermissions(
                              selected
                                ? permissions.filter((item) => item !== permission.name)
                                : [...permissions, permission.name],
                            )
                          }
                          className={`flex w-full items-center gap-3 rounded-[14px] border p-3 text-left transition ${
                            selected ? "border-[#CFF0E9] bg-[#F1F8F6]" : "border-[#CADFD9] bg-white"
                          }`}
                        >
                          <span className={`grid size-5 shrink-0 place-items-center rounded-[6px] text-[10px] ${
                            selected ? "bg-[#04B89C] text-white" : "border border-[#9FBCB5]"
                          }`}>
                            {selected ? "✓" : ""}
                          </span>
                          <span>
                            <span className="block text-[11px] text-[#1D8575]">{permission.name}</span>
                            <span className="mt-1 block text-[9px] leading-relaxed text-[#6D8F88]">{permission.detail}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button onClick={() => setConnectStep(1)} className="rounded-[13px] border border-[#B7D0CA] px-5 py-3.5 text-[11px] text-[#557A73]">
                      Back
                    </button>
                    <button
                      onClick={() => {
                        onToggleAccount(connectingPlatform);
                        setConnectStep(3);
                      }}
                      disabled={permissions.length === 0}
                      className="flex-1 rounded-[13px] bg-[#04B89C] px-5 py-3.5 text-[11px] text-white transition hover:bg-[#1D8575] disabled:opacity-35"
                    >
                      Connect account
                    </button>
                  </div>
                </div>
              )}

              {connectStep === 3 && (
                <div className="py-8 text-center">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#DBEBE7] text-xl text-[#1D8575]">✓</div>
                  <h3 className="mt-5 text-[19px] font-extrabold text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
                    Account connected
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-[10px] leading-relaxed text-[#557A73]">
                    @{accountName} is now connected through {connectingPlatform}. Your selected content will begin appearing in Quietly.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {permissions.map((permission) => (
                      <span key={permission} className="rounded-full bg-[#E8F3F0] px-3 py-2 text-[8px] text-[#04B89C]">{permission}</span>
                    ))}
                  </div>
                  <button onClick={closeConnection} className="mt-7 w-full rounded-[13px] bg-[#1D8575] px-5 py-3.5 text-[11px] text-white">
                    Done
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalyticsSection({ connected }: { connected: Platform[] }) {
  const analytics = [
    {
      icon: "clock" as UiIconName,
      label: "Time spent in social apps",
      value: "2h 45m",
      detail: "this week · down 38% since you started grouping feeds here",
      accent: "#04B89C",
    },
    {
      icon: "bell" as UiIconName,
      label: "Notifications reduced",
      value: "76%",
      detail: "312 pings across your accounts became 74 grouped summaries",
      accent: "#1D8575",
    },
    {
      icon: "trending" as UiIconName,
      label: "Posts shared",
      value: "18",
      detail: "across " + Math.max(connected.length, 1) + " platforms — composed once, published everywhere",
      accent: "#22524B",
    },
  ];

  return (
    <section className="rounded-[22px] bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.2)] md:p-7">
      <div className="flex flex-col gap-3 border-b border-[#CADFD9] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.17em] text-[#86A69F]">Digital wellbeing</p>
          <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.03em] text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
            Your analytics
          </h2>
          <p className="mt-2 max-w-lg text-[11px] leading-relaxed text-[#557A73]">
            A look at how staying connected through Quietly compares to checking every app on its own.
          </p>
        </div>
        <span className="w-fit rounded-full bg-[#E8F3F0] px-3 py-2 text-[9px] text-[#04B89C]">
          Updated today
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {analytics.map((stat) => (
          <div key={stat.label} className="rounded-[17px] border border-[#CADFD9] bg-[#F1F8F6] p-4">
            <div
              className="grid size-9 place-items-center rounded-full bg-white"
              style={{ color: stat.accent }}
            >
              <UiIcon name={stat.icon} />
            </div>
            <p
              className="mt-4 text-[26px] font-extrabold tracking-[-0.03em] [font-family:'Manrope:ExtraBold',sans-serif]"
              style={{ color: stat.accent }}
            >
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">{stat.label}</p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#557A73]">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[17px] bg-[#DBEBE7] p-4">
        <p className="text-[11px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">Why this matters</p>
        <p className="mt-2 text-[10px] leading-relaxed text-[#557A73]">
          Grouping your feeds and messages means fewer apps to open and fewer interruptions pulling you back in — so you can stay in the loop and still post just as often, with more time left for everything else.
        </p>
      </div>
    </section>
  );
}

function CloseCircleSection({
  people,
  onAdd,
  onRemove,
}: {
  people: TrackedPerson[];
  onAdd: (person: TrackedPerson) => void;
  onRemove: (id: number) => void;
}) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [draftAccounts, setDraftAccounts] = useState<Partial<Record<Platform, string>>>({});

  const trackedNames = people.map((person) => person.name);
  const suggestions = knownContacts.filter((contact) => !trackedNames.includes(contact.name) && contact.platforms.length > 1);

  const togglePlatform = (platform: Platform) => {
    setDraftAccounts((current) => {
      const next = { ...current };
      if (platform in next) {
        delete next[platform];
      } else {
        next[platform] = "";
      }
      return next;
    });
  };

  const setHandle = (platform: Platform, handle: string) => {
    setDraftAccounts((current) => ({ ...current, [platform]: handle }));
  };

  const resetForm = () => {
    setName("");
    setNote("");
    setDraftAccounts({});
  };

  const addFromForm = () => {
    const accounts = Object.entries(draftAccounts).map(([platform, handle]) => ({
      platform: platform as Platform,
      handle: handle?.trim() || `@${name.trim().toLowerCase().replace(/\s+/g, "")}`,
    }));
    if (!name.trim() || accounts.length === 0) return;
    onAdd({ id: Date.now(), name: name.trim(), note: note.trim() || undefined, accounts });
    resetForm();
  };

  const addSuggestion = (contact: (typeof knownContacts)[number]) => {
    onAdd({
      id: Date.now(),
      name: contact.name,
      avatar: contact.avatar,
      accounts: contact.platforms.map((platform) => ({ platform, handle: contact.name })),
    });
  };

  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_340px]">
      <section className="rounded-[22px] bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.2)] md:p-7">
        <div className="border-b border-[#CADFD9] pb-6">
          <p className="text-[10px] uppercase tracking-[0.17em] text-[#86A69F]">Stay close to the people who matter</p>
          <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.03em] text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
            Your close circle
          </h2>
          <p className="mt-2 max-w-lg text-[11px] leading-relaxed text-[#557A73]">
            Link someone's accounts across platforms as one person to get a combined update instead of checking each app.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {people.length === 0 && (
            <p className="rounded-[17px] border border-dashed border-[#CADFD9] p-5 text-center text-[11px] text-[#86A69F]">
              You haven't added anyone yet — add someone from the suggestions or the form on the right.
            </p>
          )}
          {people.map((person) => (
            <article key={person.id} className="rounded-[18px] border border-[#CADFD9] bg-[#F1F8F6] p-4">
              <div className="flex items-start gap-3">
                {person.avatar ? (
                  <img src={person.avatar} alt="" className="size-11 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#DBEBE7] text-[11px] text-[#1D8575]">
                    {person.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">{person.name}</p>
                    <button
                      onClick={() => onRemove(person.id)}
                      className="shrink-0 rounded-full border border-[#B7D0CA] bg-white px-3 py-1.5 text-[9px] text-[#557A73] transition hover:border-[#86A69F] hover:text-[#22524B]"
                    >
                      Remove
                    </button>
                  </div>
                  {person.note && <p className="mt-0.5 text-[10px] text-[#6D8F88]">{person.note}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {person.accounts.map((account) => (
                      <span key={account.platform} className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[9px] text-[#557A73]">
                        <PlatformMark name={account.platform} small />
                        {account.handle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-[#557A73]">
                {PERSON_SUMMARIES[person.name] ?? "No linked platform activity yet — updates will appear here once they post."}
              </p>
            </article>
          ))}
        </div>

        {suggestions.length > 0 && (
          <div className="mt-6 border-t border-[#CADFD9] pt-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#86A69F]">Suggested from your accounts</p>
            <div className="mt-3 space-y-2">
              {suggestions.map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 rounded-[15px] border border-[#CADFD9] p-3">
                  <img src={contact.avatar} alt="" className="size-9 shrink-0 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">{contact.name}</p>
                    <p className="mt-0.5 text-[10px] text-[#6D8F88]">Seen on {contact.platforms.length} platforms</p>
                  </div>
                  <button
                    onClick={() => addSuggestion(contact)}
                    className="shrink-0 rounded-full bg-[#04B89C] px-3 py-2 text-[9px] text-white transition hover:bg-[#1D8575]"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <aside className="rounded-[22px] bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.2)] md:p-7">
        <p className="text-[10px] uppercase tracking-[0.17em] text-[#86A69F]">Add someone manually</p>
        <h3 className="mt-2 text-[16px] text-[#1D8575]">Link their accounts</h3>

        <label className="mt-4 block text-[10px] text-[#557A73]">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Taylor Nguyen"
            className="mt-1.5 w-full rounded-[12px] bg-[#F1F8F6] px-3 py-2.5 text-[12px] outline-none focus:ring-1 focus:ring-[#86A69F]"
          />
        </label>

        <label className="mt-3 block text-[10px] text-[#557A73]">
          Label (optional)
          <input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="e.g. Close friend, Sister, Coworker"
            className="mt-1.5 w-full rounded-[12px] bg-[#F1F8F6] px-3 py-2.5 text-[12px] outline-none focus:ring-1 focus:ring-[#86A69F]"
          />
        </label>

        <p className="mt-4 text-[10px] text-[#557A73]">Which accounts are theirs?</p>
        <div className="mt-2 space-y-2">
          {platforms.map((platform) => {
            const linked = platform.name in draftAccounts;
            return (
              <div key={platform.name} className={`rounded-[12px] border p-2.5 transition ${linked ? "border-[#1D8575] bg-[#F1F8F6]" : "border-[#CADFD9]"}`}>
                <button onClick={() => togglePlatform(platform.name)} className="flex w-full items-center gap-2 text-left">
                  <PlatformMark name={platform.name} small />
                  <span className="flex-1 text-[11px] text-[#22524B]">{platform.name}</span>
                  <span className={`size-4 rounded-full border ${linked ? "border-[#1D8575] bg-[#1D8575]" : "border-[#B7D0CA]"}`} />
                </button>
                {linked && (
                  <input
                    value={draftAccounts[platform.name] ?? ""}
                    onChange={(event) => setHandle(platform.name, event.target.value)}
                    placeholder="@handle or display name"
                    className="mt-2 w-full rounded-[10px] bg-white px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-[#86A69F]"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          disabled={!name.trim() || Object.keys(draftAccounts).length === 0}
          onClick={addFromForm}
          className="mt-5 w-full rounded-[12px] bg-[#04B89C] px-4 py-3 text-[11px] text-white transition hover:bg-[#1D8575] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Add to close circle
        </button>
      </aside>
    </div>
  );
}

function SummaryView({ onBack }: { onBack: () => void }) {
  const [reviewed, setReviewed] = useState<number[]>([]);
  const [summaryTime, setSummaryTime] = useState("6:00 PM");
  const updates = [
    {
      id: 1,
      platform: "Instagram" as Platform,
      person: "Jordan Lee",
      avatar: "/assets/jordan-profile.jpg",
      title: "Two direct replies",
      detail: "Jordan confirmed Thursday, and Weekend Plans is waiting for your vote.",
    },
    {
      id: 2,
      platform: "Facebook" as Platform,
      person: "Local Run Club",
      avatar: "/assets/run-club-post.jpg",
      title: "Saturday route changed",
      detail: "The run now starts at the west gate at 8:00 AM.",
    },
    {
      id: 3,
      platform: "LinkedIn" as Platform,
      person: "Leah Kim",
      avatar: "/assets/leah-profile.jpg",
      title: "A useful new connection",
      detail: "Leah accepted your introduction and sent a thank-you note.",
    },
  ];

  return (
    <div className="min-h-dvh bg-[#1D8575] pb-10 [font-family:'Manrope:Medium',sans-serif]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#1D8575]/95 px-4 text-white backdrop-blur-xl md:px-8">
        <button onClick={onBack} className="rounded-full border border-white/20 px-4 py-2 text-[11px] transition hover:bg-white/10">
          <span aria-hidden="true">←</span> Back
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[14px]">AI summary</h1>
        <span className="rounded-full bg-[#04B89C] px-3 py-2 text-[9px] text-[#0D2521]">Updated now</span>
      </header>

      <div className="mx-auto grid w-full max-w-[1120px] gap-5 px-4 py-5 md:grid-cols-[minmax(0,1fr)_300px] md:px-8 md:py-8">
        <main className="rounded-[22px] bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.2)] md:p-7">
          <div className="flex flex-col gap-4 border-b border-[#CADFD9] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-[#86A69F]">Your quiet summary</p>
              <h2 className="mt-2 max-w-lg text-[25px] font-extrabold leading-tight tracking-[-0.035em] text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
                Three updates worth your attention.
              </h2>
              <p className="mt-2 text-[11px] text-[#557A73]">Eight low-priority notifications stayed muted.</p>
            </div>
            <div className="w-fit rounded-[15px] bg-[#E8F3F0] px-4 py-3 text-center">
              <p className="text-[22px] font-extrabold text-[#04B89C] [font-family:'Manrope:ExtraBold',sans-serif]">{3 - reviewed.length}</p>
              <p className="text-[8px] uppercase tracking-[0.12em] text-[#557A73]">Remaining</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {updates.map((update) => {
              const isReviewed = reviewed.includes(update.id);
              return (
                <article
                  key={update.id}
                  className={`flex items-start gap-3 rounded-[18px] border p-4 transition ${
                    isReviewed ? "border-[#CADFD9] bg-[#DBEBE7] opacity-60" : "border-[#DBEBE7] bg-[#F1F8F6]"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={update.avatar} alt="" className="size-11 rounded-full object-cover" />
                    <span className="absolute -bottom-1 -right-1"><PlatformMark name={update.platform} small /></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-[#6D8F88]">{update.person}</p>
                    <h3 className="mt-1 text-[13px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">{update.title}</h3>
                    <p className="mt-2 text-[10px] leading-relaxed text-[#557A73]">{update.detail}</p>
                  </div>
                  <button
                    onClick={() => setReviewed(isReviewed ? reviewed.filter((id) => id !== update.id) : [...reviewed, update.id])}
                    className={`shrink-0 rounded-full px-3 py-2 text-[9px] transition ${
                      isReviewed ? "bg-white text-[#557A73]" : "bg-[#04B89C] text-white hover:bg-[#1D8575]"
                    }`}
                  >
                    {isReviewed ? "Undo" : "Mark reviewed"}
                  </button>
                </article>
              );
            })}
          </div>
        </main>

        <aside className="space-y-5">
          <section className="rounded-[20px] bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#86A69F]">Next summary</p>
            <p className="mt-3 text-[21px] font-extrabold text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">Today at {summaryTime}</p>
            <p className="mt-2 text-[10px] leading-relaxed text-[#557A73]">Alerts stay quiet until your chosen time.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["12:00 PM", "6:00 PM", "9:00 PM"].map((time) => (
                <button
                  key={time}
                  onClick={() => setSummaryTime(time)}
                  className={`rounded-[10px] px-2 py-2.5 text-[8px] transition ${
                    summaryTime === time ? "bg-[#1D8575] text-white" : "bg-[#DBEBE7] text-[#557A73]"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>
          <section className="rounded-[20px] bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#86A69F]">Today’s focus</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-[25px] font-extrabold text-[#04B89C] [font-family:'Manrope:ExtraBold',sans-serif]">42 min</p>
                <p className="mt-1 text-[10px] text-[#557A73]">less social screen time</p>
              </div>
              <span className="rounded-full bg-[#DBEBE7] px-3 py-2 text-[9px] text-[#1D8575]">On track</span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function AiSummaryView({
  connected,
  people,
  onAddPerson,
  onRemovePerson,
}: {
  connected: Platform[];
  people: TrackedPerson[];
  onAddPerson: (person: TrackedPerson) => void;
  onRemovePerson: (id: number) => void;
}) {
  const [section, setSection] = useState<"insights" | "circle" | "analytics">("insights");
  const platformSummaries: Record<Platform, { headline: string; summary: string; sentiment: string; topTopic: string; stat: string }> = {
    Instagram: {
      headline: "Mostly catching up with Jordan and weekend plans",
      summary: "Jordan confirmed Thursday plans and the Design Circle group is close to finalizing a weekend meetup. Engagement on your last photo post is above average.",
      sentiment: "Upbeat",
      topTopic: "Weekend plans",
      stat: "14 new posts · 3 direct replies",
    },
    LinkedIn: {
      headline: "A few professional touchpoints worth a reply",
      summary: "Leah Kim accepted your introduction and sent a thank-you note. The Slow Edit article you saved is getting discussed in your network.",
      sentiment: "Professional",
      topTopic: "Networking",
      stat: "6 new posts · 1 new connection",
    },
    Facebook: {
      headline: "Local Run Club changed Saturday's route",
      summary: "The run now starts at the west gate at 8:00 AM. Leah Kim also shared an update that got a handful of reactions from mutual friends.",
      sentiment: "Neutral",
      topTopic: "Local Run Club",
      stat: "5 new posts · 2 event updates",
    },
    Discord: {
      headline: "Quiet week in your servers",
      summary: "Jordan Lee posted a text update in the Design Circle channel. No urgent mentions — a good week to stay unplugged.",
      sentiment: "Calm",
      topTopic: "Design Circle",
      stat: "3 new messages · 0 mentions",
    },
    Snapchat: {
      headline: "Sam and Priya shared quick moments",
      summary: "Sam Rivera sent a photo from a quiet reading spot, and Priya Shah checked in about weekend plans. Nothing time-sensitive.",
      sentiment: "Casual",
      topTopic: "Catching up",
      stat: "4 new snaps · 2 replies waiting",
    },
  };

  const sections: { id: typeof section; label: string; icon: UiIconName; badge?: number }[] = [
    { id: "insights", label: "Insights", icon: "sparkle" },
    { id: "circle", label: "Close Circle", icon: "people", badge: people.length || undefined },
    { id: "analytics", label: "Analytics", icon: "trending" },
  ];

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-5 md:px-8 md:py-8">
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        {sections.map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            aria-pressed={section === item.id}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs transition ${
              section === item.id
                ? "border-[#1D8575] bg-[#1D8575] text-white"
                : "border-[#CADFD9] bg-white text-[#13332E] hover:border-[#1D8575]"
            }`}
          >
            <UiIcon name={item.icon} className="size-4" />
            {item.label}
            {!!item.badge && (
              <span className="grid size-5 place-items-center rounded-full bg-white/25 text-[10px]">{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      {section === "insights" && (
        <section className="rounded-[22px] bg-white p-5 shadow-[0_20px_55px_rgba(13,37,33,0.2)] md:p-7">
          <div className="flex flex-col gap-3 border-b border-[#CADFD9] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-[#86A69F]">AI insights</p>
              <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.03em] text-[#1D8575] [font-family:'Manrope:ExtraBold',sans-serif]">
                A summary for each account
              </h2>
              <p className="mt-2 max-w-lg text-[11px] leading-relaxed text-[#557A73]">
                Quietly reads what changed on each platform so you can catch up in seconds, not scroll for minutes.
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#E8F3F0] px-3 py-2 text-[9px] text-[#04B89C]">
              Generated now
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {platforms.map((platform) => {
              const summary = platformSummaries[platform.name];
              const isConnected = connected.includes(platform.name);
              return (
                <article
                  key={platform.name}
                  className={`rounded-[18px] border p-4 transition ${
                    isConnected ? "border-[#CADFD9] bg-[#F1F8F6]" : "border-dashed border-[#CADFD9] bg-white opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <PlatformMark name={platform.name} />
                      <div>
                        <p className="text-[13px] font-semibold text-[#1D8575] [font-family:'Manrope:SemiBold',sans-serif]">{platform.name}</p>
                        <p className="mt-0.5 text-[10px] text-[#6D8F88]">{summary.stat}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[9px] text-[#557A73]">{summary.sentiment}</span>
                  </div>
                  {isConnected ? (
                    <>
                      <h3 className="mt-3 text-[13px] font-semibold text-[#13332E]">{summary.headline}</h3>
                      <p className="mt-2 text-[11px] leading-relaxed text-[#557A73]">{summary.summary}</p>
                      <span className="mt-3 inline-block rounded-full bg-[#DBEBE7] px-3 py-1.5 text-[9px] text-[#1D8575]">
                        Top topic: {summary.topTopic}
                      </span>
                    </>
                  ) : (
                    <p className="mt-3 text-[11px] leading-relaxed text-[#86A69F]">Connect this account in your profile to get an AI summary.</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {section === "circle" && <CloseCircleSection people={people} onAdd={onAddPerson} onRemove={onRemovePerson} />}

      {section === "analytics" && <AnalyticsSection connected={connected} />}
    </div>
  );
}

function FeedView({
  posts,
  onCompose,
  selectedPlatforms,
}: {
  posts: typeof initialPosts;
  onCompose: () => void;
  selectedPlatforms: Platform[];
}) {
  const [liked, setLiked] = useState<number[]>([]);
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [commentAdditions, setCommentAdditions] = useState<Record<number, number>>({});
  const filteredPosts =
    selectedPlatforms.length === 0
      ? posts
      : posts.filter((post) => selectedPlatforms.includes(post.platform));

  return (
    <div className="feed-depth-background min-h-[calc(100dvh-72px)] w-full">
      <button
        onClick={onCompose}
        className="fixed bottom-24 right-5 z-30 flex items-center gap-2 rounded-full bg-[#1D8575] px-5 py-3.5 text-[11px] text-white shadow-[0_14px_30px_rgba(19,51,46,0.3)] transition hover:bg-[#0D2521] md:bottom-8"
        aria-label="New post"
      >
        <UiIcon name="plus" className="size-4" />
        New post
      </button>

      <div className="mx-auto w-full max-w-[760px] space-y-3 px-4 py-5 md:px-8 md:py-8">
        {filteredPosts.map((post) => {
          const isLiked = liked.includes(post.id);
          const commentCount = post.comments + (commentAdditions[post.id] ?? 0);
          return (
            <article
              key={post.id}
              data-platform={post.platform}
              data-post-type={post.link ? "link" : post.photo ? "photo" : "text"}
              className="platform-card overflow-hidden rounded-[22px] border p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(19,51,46,0.07)]"
            >
              <div className="flex items-start gap-3">
                <div className="size-10 shrink-0 overflow-hidden rounded-full border border-[#13332E]/10 bg-[#CADFD9]">
                  <img src={post.avatar} alt={`${post.author} profile`} className="size-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[14px] leading-tight">{post.author}</h3>
                      <p className="mt-1 text-[11px] text-[#6D8F88]">{post.handle} · {post.time}</p>
                    </div>
                    <PlatformMark name={post.platform} small />
                  </div>
                  {post.link ? (
                    <>
                      <h3 className="mt-4 text-[18px] leading-[1.35] tracking-[-0.025em] text-[#13332E]">{post.body}</h3>
                      <a
                        href={post.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-4 block overflow-hidden rounded-[16px] border border-[#B7D0CA] bg-[#F1F8F6]"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden bg-[#B7D0CA]">
                          <img
                            src={post.link.image}
                            alt={post.link.alt}
                            className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          />
                          <span className="absolute bottom-3 left-3 rounded-full bg-[#0D2521]/85 px-3 py-1.5 text-[9px] text-white backdrop-blur">
                            {post.link.domain}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 p-4">
                          <p className="max-w-md text-[11px] leading-relaxed text-[#406761]">{post.link.description}</p>
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-sm text-[#13332E] transition group-hover:bg-[#04B89C]" aria-hidden="true">↗</span>
                        </div>
                      </a>
                      <div className="mt-4 flex items-center gap-2 text-[11px] text-[#557A73]">
                        <div className={`flex items-center overflow-hidden rounded-full border ${isLiked ? "border-[#04B89C] bg-[#E8F3F0]" : "border-[#B7D0CA]"}`}>
                          <button
                            onClick={() => setLiked(isLiked ? liked.filter((id) => id !== post.id) : [...liked, post.id])}
                            className={`px-3 py-2 text-sm ${isLiked ? "text-[#1D8575]" : "hover:bg-[#F1F8F6] hover:text-[#0D2521]"}`}
                            aria-label="Upvote link"
                          >
                            ↑
                          </button>
                          <span className="min-w-10 text-center text-[10px] text-[#22524B]">{(post.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                          <button className="px-3 py-2 text-sm hover:bg-[#F1F8F6] hover:text-[#0D2521]" aria-label="Downvote link">↓</button>
                        </div>
                        <button
                          onClick={() => setOpenComments(openComments === post.id ? null : post.id)}
                          className="rounded-full border border-[#B7D0CA] px-4 py-2.5 hover:bg-[#F1F8F6] hover:text-[#0D2521]"
                        >
                          Comments · {commentCount}
                        </button>
                        <button className="ml-auto rounded-full px-3 py-2.5 hover:bg-[#F1F8F6] hover:text-[#0D2521]">Share</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-4 text-[14px] leading-[1.55] text-[#13332E]">{post.body}</p>
                      {post.photo && (
                        <div className="mt-4 overflow-hidden rounded-[16px] border border-[#B7D0CA] bg-[#CADFD9]">
                          <img
                            src={post.photo.src}
                            alt={post.photo.alt}
                            className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.015]"
                          />
                        </div>
                      )}
                      <div className="mt-5 flex gap-5 text-[11px] text-[#557A73]">
                        <button
                          onClick={() => setLiked(isLiked ? liked.filter((id) => id !== post.id) : [...liked, post.id])}
                          className={isLiked ? "text-[#04B89C]" : "hover:text-[#0D2521]"}
                        >
                          {isLiked ? "Liked" : "Like"} · {post.likes + (isLiked ? 1 : 0)}
                        </button>
                        <button
                          onClick={() => setOpenComments(openComments === post.id ? null : post.id)}
                          className="hover:text-[#0D2521]"
                        >
                          Comments · {commentCount}
                        </button>
                        <button className="ml-auto hover:text-[#0D2521]">Save</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <CommentsSection
                postId={post.id}
                open={openComments === post.id}
                onClose={() => setOpenComments(null)}
                onCommentAdded={() =>
                  setCommentAdditions({
                    ...commentAdditions,
                    [post.id]: (commentAdditions[post.id] ?? 0) + 1,
                  })
                }
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ComposeView({ onPublish, onCancel }: { onPublish: (text: string, selected: Platform[]) => void; onCancel: () => void }) {
  const [selected, setSelected] = useState<Platform[]>(platforms.map((item) => item.name));
  const [text, setText] = useState("");
  const [schedule, setSchedule] = useState("Now");

  const togglePlatform = (name: Platform) => {
    setSelected(selected.includes(name) ? selected.filter((item) => item !== name) : [...selected, name]);
  };

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-5 md:px-8 md:py-8">
      <button
        onClick={onCancel}
        className="mb-4 rounded-full border border-[#B7D0CA] px-4 py-2 text-[11px] text-[#557A73] transition hover:border-[#86A69F] hover:text-[#22524B]"
      >
        <span aria-hidden="true">←</span> Back to feed
      </button>
      <section className="rounded-[24px] border border-[#CADFD9] bg-white p-5 shadow-[0_18px_45px_rgba(19,51,46,0.06)] md:p-7">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#6D8F88]">Share to</p>
            <h2 className="mt-2 text-xl tracking-[-0.03em]">Choose your circles</h2>
          </div>
          <button
            onClick={() => setSelected(selected.length === platforms.length ? [] : platforms.map((item) => item.name))}
            className="text-[11px] text-[#557A73]"
          >
            {selected.length === platforms.length ? "Clear all" : "Select all"}
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {platforms.map((platform) => {
            const active = selected.includes(platform.name);
            return (
              <button
                key={platform.name}
                onClick={() => togglePlatform(platform.name)}
                className={`flex items-center gap-2 rounded-[12px] border p-1.5 pr-3 text-xs transition ${active ? "border-[#13332E] bg-[#F1F8F6]" : "border-[#CADFD9] opacity-45"}`}
              >
                <PlatformMark name={platform.name} small />
                {platform.name}
              </button>
            );
          })}
        </div>

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What would you like to share?"
          className="mt-7 min-h-[230px] w-full resize-none rounded-[18px] border-0 bg-[#DBEBE7] p-5 text-[15px] leading-relaxed outline-none placeholder:text-[#6D8F88] focus:ring-1 focus:ring-[#86A69F]"
        />
        <div className="-mt-9 mr-4 text-right text-[10px] text-[#6D8F88]">{text.length}/500</div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#CADFD9] pt-5 sm:flex-row sm:items-center">
          <button className="rounded-[12px] border border-[#B7D0CA] px-4 py-3 text-xs transition hover:bg-[#DBEBE7]">Add images</button>
          <div className="flex rounded-[12px] bg-[#DBEBE7] p-1">
            {["Now", "6:00 PM"].map((item) => (
              <button
                key={item}
                onClick={() => setSchedule(item)}
                className={`rounded-[9px] px-4 py-2 text-[11px] ${schedule === item ? "bg-white shadow-sm" : "text-[#557A73]"}`}
              >
                {item === "Now" ? "Post now" : "Schedule 6:00 PM"}
              </button>
            ))}
          </div>
          <button
            disabled={!text.trim() || selected.length === 0}
            onClick={() => {
              onPublish(text, selected);
              setText("");
            }}
            className="rounded-[12px] bg-[#04B89C] px-5 py-3 text-xs text-[#13332E] transition hover:bg-[#1D8575] disabled:cursor-not-allowed disabled:opacity-35 sm:ml-auto"
          >
            {schedule === "Now" ? "Publish post" : "Schedule post"}
          </button>
        </div>
      </section>
    </div>
  );
}

type UiIconName = "search" | "more" | "compose" | "phone" | "video" | "info" | "attach" | "image" | "send" | "plus" | "feed" | "message" | "settings" | "clock" | "bell" | "trending" | "menu" | "close" | "chevronRight" | "user" | "sparkle" | "people" | "filter";

function UiIcon({ name, className = "size-4" }: { name: UiIconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {name === "search" && <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>}
      {name === "more" && <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>}
      {name === "compose" && <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>}
      {name === "phone" && <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />}
      {name === "video" && <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3Z" /></>}
      {name === "info" && <><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7h.01" /></>}
      {name === "attach" && <path d="m21.4 11.6-8.9 8.9a6 6 0 0 1-8.5-8.5l9.6-9.6a4 4 0 0 1 5.7 5.7l-9.6 9.6a2 2 0 0 1-2.8-2.8l8.9-8.9" />}
      {name === "image" && <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 20" /></>}
      {name === "send" && <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>}
      {name === "plus" && <><path d="M12 5v14" /><path d="M5 12h14" /></>}
      {name === "feed" && <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8" /><path d="M8 13h8" /><path d="M8 17h5" /></>}
      {name === "message" && <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 9h8" /><path d="M8 13h5" /></>}
      {name === "settings" && <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>}
      {name === "clock" && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>}
      {name === "bell" && <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>}
      {name === "trending" && <><path d="m23 6-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></>}
      {name === "menu" && <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
      {name === "close" && <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>}
      {name === "chevronRight" && <path d="m9 18 6-6-6-6" />}
      {name === "user" && <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>}
      {name === "sparkle" && <><path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" /><path d="m18 6-2.5 2.5" /><path d="m8.5 15.5-2.5 2.5" /><path d="m6 6 2.5 2.5" /><path d="m15.5 15.5 2.5 2.5" /></>}
      {name === "people" && <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" /><circle cx="17" cy="8.5" r="2.6" /><path d="M15.2 14.8c2.4.3 4.3 2.3 4.3 5.2" /></>}
      {name === "filter" && <path d="M4 5h16M7 12h10M10 19h4" />}
    </svg>
  );
}

function MessagesView() {
  const [active, setActive] = useState<number | null>(null);
  const [activeThread, setActiveThread] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Unread" | "Groups">("All");
  const [readConversations, setReadConversations] = useState<number[]>([]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState<string[]>([]);
  const [archivedConversations, setArchivedConversations] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState("");
  const [sentMessages, setSentMessages] = useState<Record<string, string[]>>({});
  const conversation = active === null ? null : conversations[active];
  const threads = conversation
    ? [{ platform: conversation.platform, messages: conversation.messages }, ...conversation.otherThreads]
    : [];
  const thread = threads[activeThread];
  const visibleConversations = conversations
    .map((item, index) => ({ item, index }))
    .filter(({ item, index }) => {
      if (archivedConversations.includes(index)) return false;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.messages.at(-1)?.text.toLowerCase().includes(search.toLowerCase());
      const isUnread = item.unread > 0 && !readConversations.includes(index);
      const matchesFilter = filter === "All" || (filter === "Unread" && isUnread) || (filter === "Groups" && item.group);
      return matchesSearch && matchesFilter;
    });
  const threadKey = conversation && thread ? `${conversation.name}-${thread.platform}` : "";

  const openConversation = (index: number) => {
    setActive(index);
    setActiveThread(0);
    setReadConversations([...readConversations, index]);
    setComposeOpen(false);
    setMenuOpen(false);
  };

  const sendMessage = () => {
    if (!draft.trim() || !threadKey) return;
    setSentMessages({ ...sentMessages, [threadKey]: [...(sentMessages[threadKey] ?? []), draft.trim()] });
    setDraft("");
  };

  return (
    <div className="mx-auto grid h-[calc(100dvh-152px)] w-full max-w-[1120px] min-w-0 overflow-x-hidden md:h-[calc(100dvh-72px)] md:grid-cols-[minmax(320px,0.9fr)_1.35fr] md:p-6">
      <section className={`${conversation ? "hidden md:flex" : "flex"} min-h-0 min-w-0 flex-col overflow-x-hidden border-[#CADFD9] bg-white md:rounded-l-[22px] md:border md:border-r-0`}>
        <div className="border-b border-[#CADFD9] bg-white p-4 md:rounded-tl-[22px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#6D8F88]">Conversations</p>
              <p className="mt-1 text-[11px] text-[#406761]">{conversations.reduce((total, item, index) => total + (readConversations.includes(index) ? 0 : item.unread), 0)} unread messages</p>
            </div>
            <button
              onClick={() => setComposeOpen(!composeOpen)}
              className="grid size-10 place-items-center rounded-full bg-[#1D8575] text-white shadow-[0_8px_20px_rgba(4,184,156,0.25)]"
              aria-label="Start a new conversation"
            >
              <UiIcon name="compose" />
            </button>
          </div>
          <div className="relative mt-4">
            <UiIcon name="search" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6D8F88]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search messages"
              className="w-full rounded-[12px] bg-[#DBEBE7] py-3 pl-10 pr-4 text-[11px] outline-none placeholder:text-[#6D8F88]"
            />
          </div>
          <div className="mt-3 flex gap-2">
            {(["All", "Unread", "Groups"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-3 py-2 text-[9px] transition ${filter === item ? "bg-[#0D2521] text-white" : "bg-[#DBEBE7] text-[#557A73]"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {composeOpen && (
          <div className="m-3 rounded-[16px] border border-[#DBEBE7] bg-[#F1F8F6] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-[#1D8575]">Start a conversation</p>
              <button onClick={() => setComposeOpen(false)} className="text-[9px] text-[#6D8F88]">Close</button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {conversations.slice(0, 4).map((item, index) => (
                <button key={item.name} onClick={() => openConversation(index)} className="shrink-0 text-center">
                  <img src={item.avatar} alt="" className="mx-auto size-9 rounded-full object-cover" />
                  <span className="mt-1 block max-w-14 truncate text-[8px] text-[#406761]">{item.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {visibleConversations.map(({ item, index }) => {
            const unread = item.unread > 0 && !readConversations.includes(index);
            const lastMessage = item.messages.at(-1)?.text ?? "";
            return (
              <button
                key={item.name}
                onClick={() => openConversation(index)}
                className={`flex w-full items-center gap-3 rounded-[16px] p-3 text-left transition ${active === index ? "bg-[#DBEBE7]" : "hover:bg-[#F1F8F6]"}`}
              >
                <div className="relative shrink-0">
                  <img src={item.avatar} alt="" className="size-11 rounded-full border border-[#13332E]/10 object-cover" />
                  <span className="absolute -bottom-1 -right-1"><PlatformMark name={item.platform} small /></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`truncate text-[12px] ${unread ? "text-[#13332E]" : "text-[#22524B]"}`}>{item.name}</p>
                    {item.group && <span className="rounded-full bg-[#E8F3F0] px-1.5 py-0.5 text-[7px] text-[#1D8575]">Group</span>}
                  </div>
                  <p className={`mt-1 truncate text-[9px] ${unread ? "text-[#22524B]" : "text-[#6D8F88]"}`}>{lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#86A69F]">{item.time}</p>
                  {unread && <span className="mt-2 ml-auto grid size-5 place-items-center rounded-full bg-[#1D8575] text-[8px] text-white">{item.unread}</span>}
                </div>
              </button>
            );
          })}
          {visibleConversations.length === 0 && <p className="p-8 text-center text-[10px] text-[#6D8F88]">No conversations found.</p>}
        </div>
      </section>

      <section className={`${conversation ? "flex" : "hidden md:flex"} min-h-0 min-w-0 flex-col overflow-x-hidden bg-[#DBEBE7] md:rounded-r-[22px] md:border md:border-[#CADFD9]`}>
        {conversation ? (
          <>
            <div className="relative flex h-16 shrink-0 items-center gap-3 border-b border-[#B7D0CA] bg-white px-4 md:rounded-tr-[22px]">
              <button onClick={() => setActive(null)} className="mr-1 text-lg md:hidden" aria-label="Back to conversations">←</button>
              <img src={conversation.avatar} alt={`${conversation.name} profile`} className="size-9 rounded-full border border-[#13332E]/10 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px]">{conversation.name}</p>
                <p className="mt-0.5 text-[9px] text-[#6D8F88]">
                  {threads.length > 1 ? `${threads.length} connected conversations` : `Messaging from ${thread.platform}`}
                  {muted.includes(conversation.name) ? " · Muted" : ""}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[#406761]">
                <button onClick={() => setNotice(`Starting an audio call with ${conversation.name}`)} className="hidden size-8 place-items-center rounded-full hover:bg-[#DBEBE7] sm:grid" aria-label="Start audio call"><UiIcon name="phone" /></button>
                <button onClick={() => setNotice(`Starting a video call with ${conversation.name}`)} className="hidden size-8 place-items-center rounded-full hover:bg-[#DBEBE7] sm:grid" aria-label="Start video call"><UiIcon name="video" /></button>
                <button onClick={() => setNotice(`${conversation.name} · ${thread.platform}`)} className="hidden size-8 place-items-center rounded-full hover:bg-[#DBEBE7] sm:grid" aria-label="Conversation information"><UiIcon name="info" /></button>
                <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-8 place-items-center rounded-full hover:bg-[#DBEBE7]" aria-label="More conversation options"><UiIcon name="more" /></button>
              </div>
              {menuOpen && (
                <div className="absolute right-4 top-14 z-20 w-44 rounded-[14px] border border-[#B7D0CA] bg-white p-2 text-[10px] shadow-[0_14px_35px_rgba(19,51,46,0.15)]">
                  <button
                    onClick={() => {
                      setMuted(muted.includes(conversation.name) ? muted.filter((name) => name !== conversation.name) : [...muted, conversation.name]);
                      setMenuOpen(false);
                    }}
                    className="w-full rounded-[9px] px-3 py-2.5 text-left hover:bg-[#DBEBE7]"
                  >
                    {muted.includes(conversation.name) ? "Unmute notifications" : "Mute notifications"}
                  </button>
                  <button
                    onClick={() => {
                      if (active !== null) setReadConversations(readConversations.filter((index) => index !== active));
                      setNotice("Conversation marked unread");
                      setMenuOpen(false);
                    }}
                    className="w-full rounded-[9px] px-3 py-2.5 text-left hover:bg-[#DBEBE7]"
                  >
                    Mark as unread
                  </button>
                  <button
                    onClick={() => {
                      if (active !== null) setArchivedConversations([...archivedConversations, active]);
                      setActive(null);
                      setMenuOpen(false);
                    }}
                    className="w-full rounded-[9px] px-3 py-2.5 text-left text-[#406761] hover:bg-[#F1F8F6]"
                  >
                    Archive conversation
                  </button>
                </div>
              )}
            </div>

            {threads.length > 1 && (
              <div className="flex flex-wrap gap-2 overflow-hidden border-b border-[#B7D0CA] bg-white px-4 py-3">
                {threads.map((item, index) => (
                  <button
                    key={item.platform}
                    onClick={() => setActiveThread(index)}
                    className={`flex shrink-0 items-center gap-2 rounded-[11px] border p-1.5 pr-3 text-[10px] transition ${activeThread === index ? "border-[#13332E] bg-[#DBEBE7]" : "border-[#CADFD9] bg-white text-[#557A73]"}`}
                  >
                    <PlatformMark name={item.platform} small />
                    {item.platform}
                  </button>
                ))}
              </div>
            )}

            {notice && (
              <button onClick={() => setNotice("")} className="mx-auto mt-3 max-w-[calc(100%_-_2rem)] truncate rounded-full bg-[#1D8575] px-4 py-2 text-[9px] text-white shadow-lg">
                {notice} · Dismiss
              </button>
            )}

            <div className="flex flex-1 flex-col justify-end gap-3 overflow-y-auto p-5 text-[12px]">
              <p className="mb-2 self-center rounded-full bg-white/70 px-3 py-1.5 text-[9px] text-[#6D8F88]">Conversation from {thread.platform}</p>
              {thread.messages.map((message, index) => (
                <div key={`${conversation.name}-${thread.platform}-${index}`} className={`flex max-w-[86%] items-end gap-2 ${message.from === "me" ? "self-end" : "self-start"}`}>
                  {message.from === "them" && <img src={conversation.avatar} alt="" className="size-7 shrink-0 rounded-full border border-[#13332E]/10 object-cover" />}
                  <p className={message.from === "me" ? "min-w-0 break-words rounded-[14px_14px_4px_14px] bg-[#0D2521] px-4 py-3 text-white" : "min-w-0 break-words rounded-[14px_14px_14px_4px] bg-white px-4 py-3 text-[#406761]"}>{message.text}</p>
                </div>
              ))}
              {(sentMessages[threadKey] ?? []).map((message, index) => (
                <p key={`${threadKey}-sent-${index}`} className="max-w-[86%] break-words self-end rounded-[14px_14px_4px_14px] bg-[#0D2521] px-4 py-3 text-white">{message}</p>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 border-t border-[#B7D0CA] bg-white p-3 md:rounded-br-[22px]"
            >
              <button type="button" onClick={() => setNotice("Attachment picker opened")} className="grid size-9 shrink-0 place-items-center rounded-full text-[#557A73] hover:bg-[#DBEBE7]" aria-label="Attach a file"><UiIcon name="attach" /></button>
              <button type="button" onClick={() => setNotice("Photo library opened")} className="grid size-9 shrink-0 place-items-center rounded-full text-[#557A73] hover:bg-[#DBEBE7]" aria-label="Add a photo"><UiIcon name="image" /></button>
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Message on ${thread.platform}…`} className="min-w-0 flex-1 rounded-[12px] bg-[#DBEBE7] px-4 py-3 text-xs outline-none" />
              <button type="submit" disabled={!draft.trim()} className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#1D8575] text-white disabled:opacity-35" aria-label="Send message"><UiIcon name="send" /></button>
            </form>
          </>
        ) : (
          <div className="m-auto max-w-xs text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#E8F3F0] text-[#1D8575]"><UiIcon name="compose" className="size-5" /></div>
            <p className="mt-4 text-[14px]">Choose a conversation</p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#6D8F88]">Read and reply across all your connected social accounts.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function Navigation({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const items: { id: Tab; label: string; short: string; icon: UiIconName; color: string; active: string }[] = [
    { id: "feeds", label: "Feeds", short: "F", icon: "feed", color: "#75CEBC", active: "#04B89C" },
    { id: "ai", label: "AI", short: "AI", icon: "sparkle", color: "#A7DED3", active: "#22524B" },
    { id: "messages", label: "Messages", short: "M", icon: "message", color: "#A7DED3", active: "#1D8575" },
  ];

  return (
    <>
      <nav className="fixed inset-x-3 bottom-3 z-40 grid h-16 grid-cols-3 items-stretch gap-1 rounded-[22px] border border-[#B7D0CA] bg-white/95 p-1 shadow-[0_14px_38px_rgba(19,51,46,0.16)] backdrop-blur-xl md:hidden">
        {items.map((item) =>
          item.id === "ai" ? (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? "page" : undefined}
              className="relative flex h-full items-center justify-center"
            >
              <span
                className={`absolute -top-4 grid size-11 place-items-center rounded-full border-[3px] border-[#F1F8F6] shadow-[0_8px_18px_rgba(4,184,156,0.4)] transition ${
                  tab === item.id ? "scale-105 bg-[#04B89C] text-white" : "bg-[#1D8575] text-white"
                }`}
              >
                <UiIcon name={item.icon} className="size-5" />
              </span>
              <span className="sr-only">{item.label}</span>
            </button>
          ) : (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-[16px] text-[9px] leading-none transition ${
                tab === item.id
                  ? "bg-[#1D8575] text-white shadow-[0_6px_15px_rgba(19,51,46,0.2)]"
                  : "text-[#557A73] hover:bg-[#DBEBE7] hover:text-[#1D8575]"
              }`}
            >
              <UiIcon name={item.icon} className="size-[15px]" />
              <span>{item.label}</span>
            </button>
          ),
        )}
      </nav>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[230px] flex-col border-r border-[#CADFD9] bg-[#F1F8F6] p-5 md:flex">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="grid size-8 place-items-center rounded-[10px] bg-[#0D2521] text-xs text-white">Q</div>
          <span className="text-[15px] tracking-[-0.02em]">Quietly</span>
        </div>
        <p className="mt-10 px-3 text-[9px] uppercase tracking-[0.16em] text-[#6D8F88]">Your space</p>
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-[14px] p-2 text-left text-xs transition ${tab === item.id ? "bg-white shadow-[0_5px_18px_rgba(19,51,46,0.06)]" : "hover:bg-white/60"}`}
            >
              <span className="grid size-9 place-items-center rounded-[10px]" style={{ backgroundColor: tab === item.id ? item.active : item.color }}>
                {item.short}
              </span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-auto rounded-[18px] bg-white p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#6D8F88]">Next digest</p>
          <p className="mt-2 text-[13px]">Today at 6:00 PM</p>
          <p className="mt-1 text-[10px] leading-relaxed text-[#6D8F88]">Alerts stay quiet until then.</p>
        </div>
      </aside>
    </>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("feeds");
  const [posts, setPosts] = useState(initialPosts);
  const [profileOpen, setProfileOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nightMode, setNightMode] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem("quietly-theme") === "dark",
  );
  const [connectedAccounts, setConnectedAccounts] = useState<Platform[]>(["Instagram", "LinkedIn"]);
  const [trackedPeople, setTrackedPeople] = useState<TrackedPerson[]>(initialTrackedPeople);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);

  const publish = (text: string, selected: Platform[]) => {
    const platform = platforms.find((item) => item.name === selected[0]) ?? platforms[0];
    setPosts([
      {
        id: Date.now(),
        platform: platform.name,
        author: "You",
        handle: selected.length > 1 ? `Shared to ${selected.length} networks` : `via ${platform.name}`,
        time: "now",
        body: text,
        color: platform.color,
        initials: "Y",
        avatar: "/assets/ingrid-profile.png",
        likes: 0,
        comments: 0,
        link: null,
        photo: null,
      },
      ...posts,
    ]);
    setTab("feeds");
  };

  const toggleAccount = (platform: Platform) => {
    setConnectedAccounts(
      connectedAccounts.includes(platform)
        ? connectedAccounts.filter((item) => item !== platform)
        : [...connectedAccounts, platform],
    );
  };

  const togglePlatformFilter = (platform: Platform | "All") => {
    if (platform === "All") {
      setSelectedPlatforms([]);
      return;
    }
    setSelectedPlatforms(
      selectedPlatforms.includes(platform)
        ? selectedPlatforms.filter((item) => item !== platform)
        : [...selectedPlatforms, platform],
    );
  };

  const changeTheme = (night: boolean) => {
    setNightMode(night);
    window.localStorage.setItem("quietly-theme", night ? "dark" : "light");
  };

  const addTrackedPerson = (person: TrackedPerson) => {
    setTrackedPeople([...trackedPeople, person]);
  };

  const removeTrackedPerson = (id: number) => {
    setTrackedPeople(trackedPeople.filter((person) => person.id !== id));
  };

  if (profileOpen) {
    return (
      <div className={nightMode ? "theme-dark" : ""}>
        <ProfileView
          connected={connectedAccounts}
          onToggleAccount={toggleAccount}
          onBack={() => setProfileOpen(false)}
        />
      </div>
    );
  }

  if (summaryOpen) {
    return <div className={nightMode ? "theme-dark" : ""}><SummaryView onBack={() => setSummaryOpen(false)} /></div>;
  }

  if (settingsOpen) {
    return (
      <div className={nightMode ? "theme-dark" : ""}>
        <SettingsView nightMode={nightMode} onThemeChange={changeTheme} onBack={() => setSettingsOpen(false)} />
      </div>
    );
  }

  return (
    <div className={nightMode ? "theme-dark" : ""}>
      <div className="min-h-dvh bg-[#F1F8F6] text-[#0D2521] md:pl-[230px]">
        <Navigation tab={tab} setTab={setTab} />
        <main className="min-h-dvh pb-24 md:pb-0">
          <AppHeader
            tab={tab}
            onMenu={() => setMenuOpen(true)}
            filtersSlot={
              tab === "feeds" ? (
                <FeedFilters selectedPlatforms={selectedPlatforms} onToggle={togglePlatformFilter} />
              ) : undefined
            }
          />
          {tab === "feeds" && (
            <FeedView posts={posts} onCompose={() => setTab("compose")} selectedPlatforms={selectedPlatforms} />
          )}
          {tab === "compose" && <ComposeView onPublish={publish} onCancel={() => setTab("feeds")} />}
          {tab === "messages" && <MessagesView />}
          {tab === "ai" && (
            <AiSummaryView
              connected={connectedAccounts}
              people={trackedPeople}
              onAddPerson={addTrackedPerson}
              onRemovePerson={removeTrackedPerson}
            />
          )}
        </main>
        <MenuDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          unreadCount={3}
          onProfile={() => {
            setMenuOpen(false);
            setProfileOpen(true);
          }}
          onSettings={() => {
            setMenuOpen(false);
            setSettingsOpen(true);
          }}
          onDigest={() => {
            setMenuOpen(false);
            setSummaryOpen(true);
          }}
        />
      </div>
    </div>
  );
}
