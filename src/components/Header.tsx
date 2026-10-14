import React, { useState } from 'react';
import { VISBUILD_ASSETS } from '../data/mockData';
import { AuditSession } from '../types/civic';

interface HeaderProps {
  session: AuditSession;
  onOpenMobileMenu: () => void;
  onOpenAdvisor: () => void;
  onSwitchCorridor: (presetId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  onOpenMobileMenu,
  onOpenAdvisor,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'IRC-103 Audit Completed',
      desc: 'Corridor #VB-9824 finished automated deficit classification.',
      time: '2m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'New CPWD Rates Ingested',
      desc: 'Delhi Schedule of Rates 2024 unit costs synced.',
      time: '1h ago',
      unread: false,
    },
    {
      id: 3,
      title: 'DPR Draft Exported',
      desc: 'Municipal committee proposal document ready.',
      time: '3h ago',
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#f8f9ff]/90 backdrop-blur-xl z-30 border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 w-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left Side: Mobile Menu Button + Logo + Corridor Badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-lg text-[#0b1c30] hover:bg-[#e5eeff] lg:hidden transition-colors"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <img
            alt="VisBuild AI Urban Vision Logo"
            className="h-7 sm:h-8 w-auto object-contain"
            src={VISBUILD_ASSETS.logo}
          />

          <div className="hidden sm:flex items-center gap-1.5 bg-[#e5eeff] px-3.5 py-1 rounded-full text-[#0b1c30] text-xs">
            <span className="material-symbols-outlined text-[#006591] text-[16px]">location_city</span>
            <span className="font-semibold truncate max-w-[200px] lg:max-w-[320px]">
              {session.locationName}
            </span>
            <span className="text-[#75777e]">•</span>
            <span className="text-[#44474d] font-mono text-[11px] font-medium">#{session.instanceId}</span>
          </div>
        </div>

        {/* Right Side: Demo Badge + AI Consultant Button + Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Ask Civic AI Button */}
          <button
            type="button"
            onClick={onOpenAdvisor}
            className="inline-flex items-center gap-1.5 bg-[#0f1e36] text-white hover:bg-[#000412] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[#6ffbbe] text-[16px]">psychology</span>
            <span className="hidden md:inline">Civic AI Advisor</span>
          </button>

          {/* Live Demo Mode pill */}
          <div className="hidden xs:flex items-center gap-1.5 bg-[#c9e6ff]/60 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#006591] animate-pulse"></span>
            <span className="text-[11px] text-[#001e2f] font-bold uppercase tracking-wider">
              Live Demo
            </span>
          </div>

          <div className="h-4 w-px bg-[#c5c6ce] hidden sm:block"></div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#44474d] hover:text-[#0b1c30] rounded-full hover:bg-[#e5eeff] transition-colors relative"
              type="button"
              aria-label="View notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#c5c6ce]/40 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#e5eeff]">
                  <span className="font-semibold text-xs text-[#0b1c30]">Civic Telemetry Alerts</span>
                  <span className="text-[10px] text-[#006591] font-semibold cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 rounded-lg bg-[#f8f9ff] hover:bg-[#e5eeff]/70 text-xs transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#0b1c30]">{n.title}</span>
                        <span className="text-[10px] text-[#75777e]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#44474d] mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Info */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-1 cursor-pointer"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-[#0b1c30] leading-tight">Admin Lead</div>
                <div className="text-[11px] text-[#44474d] leading-tight">Municipal Urban Planner</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#000412] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#c5c6ce]/40 p-3 z-50">
                <div className="pb-2 border-b border-[#e5eeff]">
                  <div className="font-semibold text-xs text-[#0b1c30]">Adarsh Singh</div>
                  <div className="text-[11px] text-[#75777e]">adarshsingh00335@gmail.com</div>
                  <div className="text-[10px] bg-[#e5eeff] text-[#006591] px-1.5 py-0.5 rounded font-mono mt-1 inline-block">
                    Role: Chief Civic Planner
                  </div>
                </div>
                <div className="pt-2 text-xs flex flex-col gap-1 text-[#44474d]">
                  <div className="px-2 py-1.5 rounded hover:bg-[#f8f9ff] cursor-pointer">
                    Civic Jurisdiction: Municipal Zone 4
                  </div>
                  <div className="px-2 py-1.5 rounded hover:bg-[#f8f9ff] cursor-pointer">
                    Approval Tier: Superintending Engineer
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
