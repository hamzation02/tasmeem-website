/* TASMEEM WOODWORKS: applies control-room settings to the public site.
   If Supabase is unreachable, the page simply keeps its built-in content. */
(function () {
  var U = "https://vmfcjvgwazutzlfmhddk.supabase.co", K = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZmNqdmd3YXp1dHpsZm1oZGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMzAyNDgsImV4cCI6MjEwODcwNjI0OH0.th8McSLPqZonU5zZHj_27Xin0lUv_KMwhbqTtOSJKfA", H = { apikey: K, Authorization: "Bearer " + K };
  var q = function (s, r) { return (r || document).querySelector(s); };
  var qa = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var https = function (u) { return /^https:\/\//.test(u || ""); };
  function get(t) { return fetch(U + "/rest/v1/" + t, { headers: H }).then(function (r) { if (!r.ok) throw 0; return r.json(); }); }
  function mk(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }
  Promise.all([get("site_settings?select=key,value"), get("gallery?select=*&order=created_at.desc")]).then(function (res) {
    var s = {}; res[0].forEach(function (r) { if (r.value) s[r.key] = r.value; });
    var root = document.documentElement.style;
    ["gold", "walnut", "timber", "cream"].forEach(function (n) { if (/^#[0-9a-f]{6}$/i.test(s["color_" + n] || "")) root.setProperty("--" + n, s["color_" + n]); });
    if (s.announcement_on === "1" && s.announcement_text) {
      var bar = mk(s.announcement_link && /^(https:\/\/|tel:|#)/.test(s.announcement_link) ? "a" : "div", "", s.announcement_text);
      if (bar.tagName === "A") bar.href = s.announcement_link;
      bar.style.cssText = "display:block;background:var(--gold);color:var(--walnut);text-align:center;padding:10px 4%;font:600 .95rem system-ui,Arial,sans-serif;text-decoration:none";
      document.body.insertBefore(bar, document.body.firstChild);
    }
    var h1 = q(".hero h1"), lead = q(".hero .lead"), hero = q(".hero"), cr = q(".hero .credit");
    if (s.hero_title && h1) h1.textContent = s.hero_title;
    if (s.hero_text && lead) lead.textContent = s.hero_text;
    if (https(s.hero_image) && hero) { hero.style.background = "linear-gradient(105deg,rgba(74,40,24,.94),rgba(74,40,24,.7)),url(\"" + s.hero_image + "\") center/cover"; if (cr) cr.textContent = s.hero_credit || ""; }
    var vid = null;
    if (s.video_type === "upload" && https(s.video_file)) { vid = mk("video"); vid.controls = true; vid.preload = "metadata"; vid.setAttribute("playsinline", ""); vid.src = s.video_file; vid.style.cssText = "width:100%;border-radius:12px;background:#000"; }
    if (s.video_type === "youtube") {
      var m = (s.video_url || "").match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
      if (m) { vid = mk("div"); vid.style.cssText = "position:relative;padding-bottom:56.25%;height:0"; var f = mk("iframe"); f.src = "https://www.youtube-nocookie.com/embed/" + m[1]; f.title = "Video"; f.allowFullscreen = true; f.setAttribute("loading", "lazy"); f.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:12px"; vid.appendChild(f); }
    }
    if (vid && q("#why")) {
      var sec = mk("section", "section alt"); sec.id = "video"; var w = mk("div", "wrap narrow");
      w.appendChild(mk("p", "eyebrow dark center", "Watch")); w.appendChild(mk("h2", "center", s.video_title || "See our work")); w.appendChild(vid);
      sec.appendChild(w); q("#why").parentNode.insertBefore(sec, q("#why"));
    }
    if (typeof CONFIG !== "undefined") { if (s.email) CONFIG.email = s.email; }
    var wa = (s.whatsapp || "").replace(/\D/g, "");
    if (wa) { if (typeof CONFIG !== "undefined") CONFIG.whatsappNumber = wa; qa("[data-wa]").forEach(function (a) { a.href = a.href.replace(/wa\.me\/\d+/, "wa.me/" + wa); if (a.parentNode.tagName === "LI") a.textContent = "+" + wa; }); }
    if (s.phone) qa('a[href^="tel:"]').forEach(function (a) { a.href = "tel:" + s.phone.replace(/[^\d+]/g, ""); a.textContent = s.phone; });
    if (s.email) qa('a[href^="mailto:"]').forEach(function (a) { a.href = "mailto:" + s.email; a.textContent = s.email; });
    qa("#contact .contact li").forEach(function (li) {
      var l = (q("b", li) || {}).textContent, sp = q("span", li);
      if (sp && l === "Office address" && s.address) sp.textContent = s.address;
      if (sp && l === "Business hours" && s.hours) sp.textContent = s.hours;
    });
    var soc = { "Facebook": "social_facebook", "Instagram": "social_instagram", "TikTok": "social_tiktok", "YouTube": "social_youtube", "X (Twitter)": "social_x" };
    qa(".social a").forEach(function (a) { var v = s[soc[a.textContent]]; if (https(v)) a.href = v; });
    var g = res[1].filter(function (r) { return https(r.url); }), gal = q(".gallery");
    if (g.length && gal) {
      gal.textContent = "";
      g.forEach(function (r) {
        var fig = mk("figure", r.is_stock ? "stock" : ""), im = mk("img"); im.src = r.url; im.alt = r.caption || "Project photo"; im.loading = "lazy";
        fig.appendChild(im); fig.appendChild(mk("figcaption", "", (r.caption || "") + (r.is_stock ? " (illustrative stock image)" : ""))); gal.appendChild(fig);
      });
      var note = q("#projects .note");
      if (note) { if (g.some(function (r) { return r.is_stock; })) note.textContent = "Images marked illustrative are stock images, not our completed projects."; else note.style.display = "none"; }
    }
  }).catch(function () {});
})();
