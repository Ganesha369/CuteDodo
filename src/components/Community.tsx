import React from 'react';
import { Send, Twitter, MessageSquare, ExternalLink, Heart, Repeat, Share2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Community: React.FC = () => {
  const posts = [
    {
      id: '1',
      author: 'CuteDoDo Official',
      handle: '@CuteDoDoToken',
      time: '2h ago',
      content: 'Grandma just poured Dodo his morning milk while reading the Solana charts! 🐶🥛 Remember: 0% marketing tokens, 1% strictly for pet shelters. We build for real dogs! 🐾',
      likes: '1,420',
      retweets: '389',
    },
    {
      id: '2',
      author: 'CuteDoDo Official',
      handle: '@CuteDoDoToken',
      time: '6h ago',
      content: 'Did you know Dodo will never let go of his bone? That is our exact policy for the Guardian Wallets: NEVER SELL. Pure loyalty and protection! 🦴✨',
      likes: '954',
      retweets: '241',
    },
    {
      id: '3',
      author: 'CuteDoDo Official',
      handle: '@CuteDoDoToken',
      time: '1d ago',
      content: 'First shelter milestone is Chennai, Tamil Nadu at $100k market cap! Fresh food & water bowls for thirsty strays in the summer heat. Receipts posted on Solscan! 🥣💧',
      likes: '2,810',
      retweets: '720',
    },
  ];

  return (
    <section id="community" className="py-8 sm:py-12 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7D9C7] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2 sm:mb-3">
            <span>🌐 Global Pack</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-2 sm:mb-3">
            Join the <span className="text-[#FF9F00]">Dodo Pack</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#79513B] font-medium">
            Driven by community. Fueled by kindness. Launch news, memes and the shelter votes all happen here.
          </p>
        </div>

        {/* 3 Main Community Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 mb-8 sm:mb-16">
          
          <a
            href="https://t.me/+pjv_zrm5Cjc1MWNl"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.pop()}
            className="cartoon-card bg-[#c6f7f7] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center group hover:opacity-95 transition-all flex flex-col items-center justify-between"
          >
            <div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#C6EAD7] border-2 border-[#49200B] flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 mx-auto shadow-[2px_2px_0px_#49200B] sm:shadow-[3px_3px_0px_#49200B] group-hover:scale-105 transition-transform">
                ✈️
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#49200B] mb-1">
                Telegram
              </h3>
              <p className="text-xs sm:text-sm font-bold font-heading text-[#FF9F00] mb-2 sm:mb-3">
                Chat with the pack
              </p>
              <p className="text-xs text-[#79513B] font-medium leading-relaxed">
                Live 24/7 community voice, launch countdown, memes, and direct updates from VJDurga.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 w-full py-2 sm:py-2.5 rounded-xl bg-[#C6EAD7] border-2 border-[#49200B] font-bold font-heading text-xs text-[#49200B] flex items-center justify-center gap-1 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <span>Join Telegram Group</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://x.com/CuteDODO_18"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.pop()}
            className="cartoon-card bg-[#f5d9d5] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center group hover:opacity-95 transition-all flex flex-col items-center justify-between"
          >
            <div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#FFD36A] border-2 border-[#49200B] flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 mx-auto shadow-[2px_2px_0px_#49200B] sm:shadow-[3px_3px_0px_#49200B] group-hover:scale-105 transition-transform">
                𝕏
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#49200B] mb-1">
                X (Twitter)
              </h3>
              <p className="text-xs sm:text-sm font-bold font-heading text-[#FF9F00] mb-2 sm:mb-3">
                Announcements &amp; memes
              </p>
              <p className="text-xs text-[#79513B] font-medium leading-relaxed">
                Official news, viral dog memes, milestone updates, and daily videos of Dodo!
              </p>
            </div>
            <div className="mt-4 sm:mt-6 w-full py-2 sm:py-2.5 rounded-xl bg-[#FFD36A] border-2 border-[#49200B] font-bold font-heading text-xs text-[#49200B] flex items-center justify-center gap-1 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <span>Follow @CuteDoDo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://discord.gg/9f7bBxgRS9"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.pop()}
            className="cartoon-card bg-[#d4d5eb] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center group hover:opacity-95 transition-all flex flex-col items-center justify-between"
          >
            <div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#F7D9C7] border-2 border-[#49200B] flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 mx-auto shadow-[2px_2px_0px_#49200B] sm:shadow-[3px_3px_0px_#49200B] group-hover:scale-105 transition-transform">
                👾
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#49200B] mb-1">
                Discord
              </h3>
              <p className="text-xs sm:text-sm font-bold font-heading text-[#FF9F00] mb-2 sm:mb-3">
                Holder chat &amp; votes
              </p>
              <p className="text-xs text-[#79513B] font-medium leading-relaxed">
                Holder verification, shelter governance channel, meme contests, and international chat.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 w-full py-2 sm:py-2.5 rounded-xl bg-[#F7D9C7] border-2 border-[#49200B] font-bold font-heading text-xs text-[#49200B] flex items-center justify-center gap-1 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <span>Enter Discord Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

        </div>

        {/* Latest from @CuteDoDoToken Feed */}
        <div className="cartoon-card bg-[#FFF9F0] rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#49200B]/15">
            <div>
              <h3 className="text-2xl font-bold font-heading text-[#49200B]">
                Latest from @CuteDoDoToken
              </h3>
              <p className="text-xs sm:text-sm text-[#79513B] font-medium">
                See the latest posts and community drops on X.
              </p>
            </div>
            <a
              href="https://twitter.com/CuteDoDoToken"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.pop()}
              className="cartoon-btn px-4 py-2 bg-[#FFD36A] hover:bg-[#ffc947] text-[#49200B] font-bold font-heading text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
            >
              <span>Open @CuteDoDoToken</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post, idx) => {
              const postBgs = ['bg-[#f7ecde]', 'bg-[#f1f8fc]', 'bg-[#e0f4dd]'];
              const postBg = postBgs[idx] || 'bg-white';
              const avatarBg = idx === 0 ? 'bg-[#e5e5e5]' : 'bg-[#FFD36A]';

              return (
                <div
                  key={post.id}
                  className={`${postBg} border-2 border-[#49200B] rounded-2xl p-4 shadow-[2px_2px_0px_#49200B] flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-full ${avatarBg} border border-[#49200B] flex items-center justify-center text-sm font-bold`}>
                        🐶
                      </div>
                      <div>
                        <div className="text-xs font-bold font-heading text-[#49200B]">{post.author}</div>
                        <div className="text-[11px] text-[#79513B] font-medium">{post.handle} · {post.time}</div>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#49200B] font-medium leading-relaxed mb-4">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#49200B]/15 text-xs font-semibold text-[#79513B]">
                    <span className="flex items-center gap-1 text-[#FF9F00]">
                      <Heart className="w-3.5 h-3.5 fill-[#FF9F00]" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800">
                      <Repeat className="w-3.5 h-3.5" /> {post.retweets}
                    </span>
                    <span className="flex items-center gap-1 text-[#79513B]">
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
