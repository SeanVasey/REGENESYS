/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { T } from "../lib/tokens.js";

const AppIcon = ({ size = 36 }) => (
  <img
    src="/regenesys-icon-optimized.svg"
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    style={{ display: "block" }}
  />
);

const VaseyLogo = ({ size = 24, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 688.0 592.0"
    width={size}
    height={size}
    style={style}
    aria-label="VASEY/AI Logo"
    role="img"
  >
    <g transform="translate(0,592.0) scale(0.1,-0.1)" fill="currentColor">
      <path d="M20 3827 l0 -2073 251 -265 c138 -145 281 -299 317 -341 37 -42 70 -76 74 -75 3 1 8 851 10 1889 2 1038 8 1891 12 1895 5 4 11 2 13 -5 3 -7 51 -70 106 -139 144 -178 444 -556 611 -767 77 -98 193 -245 257 -325 64 -80 223 -281 353 -446 130 -165 301 -381 380 -480 78 -99 205 -261 282 -359 76 -99 176 -227 222 -285 46 -58 104 -133 130 -166 323 -418 405 -517 415 -499 13 24 111 152 237 309 83 104 193 244 345 438 22 29 76 97 120 153 44 56 116 148 160 205 44 57 213 270 375 474 162 203 307 386 322 405 15 19 89 112 165 207 76 94 174 218 217 275 44 57 202 258 350 447 317 403 353 448 409 521 l42 55 3 -1903 c1 -1047 6 -1902 10 -1900 4 2 50 50 102 108 52 58 184 197 294 310 110 113 211 221 225 241 l26 35 0 225 c0 123 -1 1053 -2 2067 l-3 1842 -323 0 c-309 0 -323 -1 -332 -19 -6 -11 -57 -79 -115 -151 -126 -158 -178 -226 -377 -486 -83 -109 -191 -249 -240 -311 -48 -61 -166 -212 -262 -335 -197 -251 -337 -430 -522 -663 -70 -88 -146 -186 -170 -217 -120 -155 -371 -476 -528 -673 -96 -121 -198 -249 -226 -285 -28 -36 -111 -140 -184 -232 l-133 -166 -27 31 c-15 18 -49 61 -77 97 -27 36 -103 133 -169 216 -66 82 -164 206 -217 275 -53 68 -170 216 -258 329 -89 113 -276 354 -417 535 -141 182 -289 371 -328 420 -39 50 -128 162 -196 250 -69 88 -181 232 -250 319 -68 87 -221 283 -339 435 -119 152 -271 345 -338 429 -67 84 -129 164 -138 177 l-16 25 -324 0 -324 0 0 -2073z M1209 5883 c5 -10 66 -90 136 -178 69 -88 176 -225 238 -305 61 -80 146 -188 187 -241 41 -52 106 -136 145 -185 38 -49 121 -155 185 -235 63 -80 141 -179 172 -220 62 -79 308 -394 532 -679 213 -272 298 -381 471 -603 88 -114 162 -206 165 -206 3 0 21 21 41 47 19 26 109 141 200 256 90 115 247 315 348 445 236 302 465 594 547 696 102 128 375 474 563 716 96 123 216 276 266 339 50 63 136 171 190 240 l98 125 -374 3 c-292 2 -375 0 -380 -10 -4 -7 -102 -132 -218 -278 -116 -146 -223 -281 -238 -301 -98 -128 -269 -345 -333 -423 -41 -50 -93 -116 -115 -146 -22 -30 -78 -102 -125 -160 -78 -96 -186 -232 -388 -490 -41 -52 -79 -95 -83 -95 -5 0 -46 48 -91 106 -101 129 -455 578 -750 949 -509 643 -621 786 -642 817 l-21 33 -368 0 c-347 0 -367 -1 -358 -17z M1130 2171 l0 -1484 163 -166 c156 -159 343 -353 437 -453 25 -27 48 -48 53 -48 4 0 7 637 7 1415 l0 1415 -33 37 c-19 21 -151 184 -295 363 -144 179 -277 343 -296 365 l-35 40 -1 -1484z M5633 3532 c-50 -64 -193 -245 -317 -401 l-226 -284 0 -1413 c0 -887 4 -1414 10 -1414 5 0 13 6 17 14 10 18 110 125 267 286 66 69 175 181 241 250 l120 125 -3 1478 c-1 812 -5 1477 -10 1476 -4 0 -48 -53 -99 -117z" />
    </g>
  </svg>
);

const svg = (d, w = 18, h = 18) => {
  const C = () => (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  );
  C.displayName = "Icon";
  return C;
};

export const Icons = {
  AppIcon,
  VaseyLogo,
  Upload: svg(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>, 22, 22),
  Image: svg(<><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>),
  Sparkle: svg(<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />),
  Copy: svg(<><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>, 14, 14),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Layers: svg(<><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>),
  Settings: svg(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>),
  Ban: svg(<><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></>),
  Tag: svg(<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>),
  Loader: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "vai-spin 1s linear infinite" }} aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
  ChevUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  ChevDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Palette: svg(<><circle cx="13.5" cy="6.5" r="2" /><circle cx="17.5" cy="10.5" r="2" /><circle cx="8.5" cy="7.5" r="2" /><circle cx="6.5" cy="12.5" r="2" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.14-.77-.38-1.06A1.48 1.48 0 0 1 13.5 18c0-.83.67-1.5 1.5-1.5H17c2.76 0 5-2.24 5-5 0-4.42-4.03-9.5-10-9.5z" /></>),
  Wand: svg(<><path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8L19 13" /><path d="M15 9h0" /><path d="M17.8 6.2L19 5" /><path d="M3 21l9-9" /><path d="M12.2 6.2L11 5" /></>),
  Zap: svg(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />),
  History: svg(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, 16, 16),
  Trash: svg(<><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>, 14, 14),
  Download: svg(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>, 14, 14),
};
