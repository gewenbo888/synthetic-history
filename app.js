const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const html = document.documentElement;
const langBtn = $('#lang-btn'), themeBtn = $('#theme-btn');
const sLang = localStorage.getItem('sh-lang') || 'en';
const sTheme = localStorage.getItem('sh-theme') || 'dark';
html.setAttribute('data-lang', sLang); html.setAttribute('data-theme', sTheme);
langBtn.textContent = sLang === 'en' ? 'EN' : '中';
langBtn.addEventListener('click', () => { const n = html.getAttribute('data-lang') === 'en' ? 'zh' : 'en'; html.setAttribute('data-lang', n); localStorage.setItem('sh-lang', n); langBtn.textContent = n === 'en' ? 'EN' : '中'; });
themeBtn.addEventListener('click', () => { const n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; html.setAttribute('data-theme', n); localStorage.setItem('sh-theme', n); });

$('#hero-viz').innerHTML = `<svg viewBox="0 0 540 540" xmlns="http://www.w3.org/2000/svg">
  <line x1="80" y1="270" x2="240" y2="270" stroke="var(--primary)" stroke-width="3"/>
  <circle cx="240" cy="270" r="10" fill="var(--primary)"/>
  ${(() => { const branches = [{a:-25,c:'#ffd06a'},{a:0,c:'#5fdcff'},{a:25,c:'#ff7bbf'}]; let out = ''; for (const b of branches) { const rad = b.a * Math.PI/180; const ex = 240 + 220 * Math.cos(rad); const ey = 270 + 220 * Math.sin(rad); out += `<line x1="240" y1="270" x2="${ex}" y2="${ey}" stroke="${b.c}" stroke-width="2.5" stroke-opacity="0.8"/><circle cx="${ex}" cy="${ey}" r="9" fill="${b.c}"/>`; for (let i = 0; i < 4; i++) { const t = 0.4 + i * 0.15; const px = 240 + 220 * t * Math.cos(rad); const py = 270 + 220 * t * Math.sin(rad); out += `<circle cx="${px}" cy="${py}" r="3" fill="${b.c}" opacity="${0.5 + i*0.12}"/>`; } } return out; })()}
  <text x="80" y="290" font-family="JetBrains Mono" font-size="11" fill="var(--muted)">PAST</text>
  <text x="240" y="290" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="var(--primary)">DIVERGENCE</text>
  <text x="270" y="510" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="var(--muted)" letter-spacing="3">3 ALTERNATE TIMELINES</text>
</svg>`;

const points = {
  tang:       { en_t: 'Tang Dynasty continues past 907', zh_t: '唐朝延续过 907' },
  industrial: { en_t: 'Industrial Revolution stays in Britain only', zh_t: '工业革命仅留在英国' },
  plague:     { en_t: 'No Black Death (1346–53)', zh_t: '无黑死病（1346–53）' },
  cuban:      { en_t: 'Cuban Missile Crisis goes hot (1962)', zh_t: '古巴导弹危机变热（1962）' },
  internet:   { en_t: 'No public internet by 2000', zh_t: '2000 年仍无公共互联网' },
  gpt:        { en_t: 'No GPT moment in 2022', zh_t: '2022 年无 GPT 时刻' },
};

const trajectories = {
  tang: {
    convergent: { en_i: 'centralised East Asian polity persists; meritocratic bureaucracy continues; trade networks expand without the Song-Yuan transition.', zh_i: '中央集权的东亚政体延续；科举官僚制延续；贸易网络在没有宋元过渡的情况下扩张。', en_a: 'modern China-equivalent emerges around 1750 with similar economic weight, different cultural register; Industrial Revolution arrives via Tang-equivalent merchant networks 50 years later than ours.', zh_a: '相当于现代中国的政体约在 1750 年出现，经济权重相似、文化语域不同；工业革命通过唐代等价的商人网络比我们晚 50 年到达。', en_h: 'most counterfactuals collapse toward the world we got within 200 years; structural economic forces dominate dynastic specifics.', zh_h: '多数反事实在 200 年内收敛回我们所得的世界；结构性经济力量主导朝代具体细节。' },
    divergent: { en_i: 'no Mongol unification of Eurasia; no Yuan, no Ming, no Qing; East Asian power remains regional rather than continental.', zh_i: '欧亚大陆无蒙古统一；无元、无明、无清；东亚力量保持区域性而非洲际。', en_a: 'Russian-Mongol-Persian Eurasian heartland never consolidates; Eurasian trade routes shift dramatically; world economic geography of 2026 unrecognisable.', zh_a: '俄—蒙—波斯欧亚腹地从未巩固；欧亚贸易路线大幅位移；2026 年的世界经济地理不可辨认。', en_h: 'this trajectory is the most uncertain because it removes a structural shock; without the Mongol shock, downstream causal chains lose their primary node.', zh_h: '此轨迹最不确定，因为它移除了一次结构性冲击；没有蒙古冲击，下游因果链失去其主节点。' },
    ruined: { en_i: 'Tang continuation foreclosed the Song printing-and-commercial revolution that produced our world\'s early-modern East Asian dynamism.', zh_i: '唐代延续封堵了产生我们世界早期现代东亚活力的宋代印刷与商业革命。', en_a: 'world ends up with weaker pre-modern Eurasian commercial integration; Industrial Revolution arrives later globally; modern world has 50–100 fewer years of accumulated wealth.', zh_a: '世界最终具有较弱的前现代欧亚商业整合；工业革命全球更晚到达；现代世界少 50–100 年累积财富。', en_h: 'this trajectory illustrates that "preserving X" is not always the better move; what looks like stability can foreclose the regime shift that generated the value we now have.', zh_h: '此轨迹说明"保留 X"不总是更好的动作；看起来像稳定的，可能封堵了产生我们现在所有价值的制度转变。' },
  },
  industrial: {
    convergent: { en_i: 'Industrial Revolution remains contained in Britain for 50 additional years; spread is via direct British capital export rather than imitation.', zh_i: '工业革命额外 50 年限制在英国；传播经由直接的英国资本出口而非模仿。', en_a: 'world arrives at industrialisation 50 years later but with a more concentrated capital structure; British empire lasts longer; democratisation comes more slowly.', zh_a: '世界 50 年后到达工业化，但具有更集中的资本结构；大英帝国持续更久；民主化更慢到来。', en_h: 'the timing of containment matters more than the containment itself; once industrial knowledge is encoded, full containment is structurally impossible past one generation.', zh_h: '抑制的时机比抑制本身更要紧；一旦工业知识被编码，完全抑制在一代以上结构上不可能。' },
    divergent: { en_i: 'British monopoly on industrialisation produces a globally hegemonic empire that does not collapse in the 20th century.', zh_i: '英国对工业化的垄断产生一个 20 世纪不崩溃的全球霸权帝国。', en_a: 'no German rise, no Russian revolution, no Chinese revolution, no decolonisation as we know it; modern world is an extended British-dominated regime.', zh_a: '无德国崛起、无俄罗斯革命、无中国革命、没有我们所知的去殖民化；现代世界是延长的英国主导制度。', en_h: 'this is the most extreme divergence and probably the least likely; the structural forces that drove industrialisation elsewhere were not solely caused by British leakage.', zh_h: '这是最极端的分叉，也可能最不可能；驱动他处工业化的结构力量并非仅由英国泄漏所致。' },
    ruined: { en_i: 'British monopoly forecloses the German chemical industry, the American mass-production industry, the Japanese textile industry — and the cumulative knowledge they produced.', zh_i: '英国垄断封堵德国化学工业、美国大规模生产工业、日本纺织业——以及它们所产出的累积知识。', en_a: 'world\'s 20th-century knowledge stock is roughly 30% lower; specific technologies that emerged from non-British contexts (synthetic chemistry, mass-production methods, certain alloys) take 50–100 years longer.', zh_a: '世界 20 世纪知识存量低约 30%；从非英国语境涌现的特定技术（合成化学、大规模生产方法、某些合金）晚 50–100 年。', en_h: 'this trajectory makes visible that knowledge is not a single global stock; it is produced by multiple geographically-distinct contexts, and removing any one impoverishes the rest.', zh_h: '此轨迹让"知识不是单一全球存量"可见；它由多个地理上不同的语境产出，移除任一让其余贫困化。' },
  },
  plague: {
    convergent: { en_i: 'European population continues growing through 14th century; labour markets do not get the wage shock that ended serfdom.', zh_i: '欧洲人口在 14 世纪持续增长；劳动力市场不获得终结农奴制的工资冲击。', en_a: 'European modernisation is delayed by 100–150 years; commercial revolution still happens but via Italian/Iberian channels rather than Northern European; Renaissance arrives later and elsewhere.', zh_a: '欧洲现代化延迟 100–150 年；商业革命仍发生，但经由意大利/伊比利亚渠道而非北欧；文艺复兴更晚、在他处到达。', en_h: 'the Black Death is one of the more frequently-cited "necessary" historical traumas; this trajectory shows that the change was over-determined and would have arrived through other channels.', zh_h: '黑死病是较常被引用为"必要"的历史创伤之一；此轨迹显示该改变是被过度决定的，会通过其他渠道到达。' },
    divergent: { en_i: 'no medieval-era population shock; high feudal Europe persists for an additional century, then experiences a different kind of structural collapse.', zh_i: '无中世纪人口冲击；盛期封建欧洲额外延续一个世纪，然后经历不同种类的结构性崩溃。', en_a: 'European political geography of 2026 is unrecognisable; possibly more federated, possibly more centralised, but not the nation-state system we have.', zh_a: '2026 年的欧洲政治地理不可辨认；可能更联邦化，可能更集权化，但不是我们所有的民族国家体系。', en_h: 'population shocks rarely fail to occur on civilisational timescales; the question is which shock and when. Removing one specific shock is unlikely to be net positive.', zh_h: '在文明时间尺度上人口冲击很少不发生；问题是哪种冲击、何时。移除一次具体冲击不太可能是净正面的。' },
    ruined: { en_i: 'no Black Death means no labour-shortage-driven wage rise that funded the early modern peasant land-ownership in parts of Europe.', zh_i: '无黑死病意味着无劳动力短缺驱动的工资上升，该上升资助了欧洲部分地区早期现代农民的土地所有权。', en_a: 'land-ownership distribution in 1700 Europe is more concentrated; the seeds of liberal political economy are weaker; modern democracy of European varieties takes longer to appear.', zh_a: '1700 年欧洲的土地所有权分配更集中；自由主义政治经济的种子更弱；欧洲变种的现代民主更长才出现。', en_h: 'some "ruins" are the price of trauma. The Black Death killed perhaps 30% of Europe; the secondary effect was peasant economic empowerment. Trauma is not necessary for empowerment, but it has happened to be one of its causes.', zh_h: '某些"毁灭"是创伤的代价。黑死病大概杀死 30% 的欧洲；次级效应是农民经济赋权。创伤不是赋权的必要条件，但它恰好是其原因之一。' },
  },
  cuban: {
    convergent: { en_i: 'limited nuclear exchange in 1962 (cities lost on both sides, perhaps 50–200 million dead globally); but no extinction-level escalation.', zh_i: '1962 年有限核交换（双方城市损失，全球约 5000 万–2 亿死亡）；但无灭绝级升级。', en_a: 'global politics 1965+ converges toward a non-proliferation regime stricter than ours and a much smaller nuclear arsenal; Cold War ends earlier; world economic recovery completes by 1990.', zh_a: '1965 年后的全球政治收敛到比我们更严格的不扩散制度与小得多的核武库；冷战更早结束；世界经济复苏到 1990 年完成。', en_h: 'this is the rare counterfactual where the alternate timeline\'s long-run state is structurally more stable than ours, but at catastrophic short-run cost.', zh_h: '这是罕见的反事实——替代时间线的长期状态在结构上比我们的更稳定，但短期代价灾难性。' },
    divergent: { en_i: 'full strategic exchange; northern hemisphere civilisation collapses; southern hemisphere persists as primary human population.', zh_i: '全面战略交换；北半球文明崩溃；南半球作为主要人类人口延续。', en_a: '21st-century world centres are São Paulo, Lagos, Jakarta, Mumbai; northern hemisphere has scattered populations and recovers slowly; technological knowledge is preserved in fragments and rebuilt over centuries.', zh_a: '21 世纪的世界中心是圣保罗、拉各斯、雅加达、孟买；北半球人口稀散、缓慢恢复；技术知识以碎片形式被保存，在数世纪内重建。', en_h: 'this is the genuinely most-different trajectory in the catalog; it is also the one whose details are least defensible because the post-collapse world is poorly modelled.', zh_h: '这是目录中真正最不同的轨迹；它也是细节最难辩护的一条，因为崩溃后的世界建模不佳。' },
    ruined: { en_i: 'extinction or near-extinction; humanity reduced to scattered small populations; civilisational rebuild from a degraded starting point.', zh_i: '灭绝或近灭绝；人类减少到分散的小型人口；从降级起点开始的文明重建。', en_a: '2026 in this trajectory has fewer than 100 million humans, mostly in remote agricultural communities; technological knowledge largely lost; recovery to 2020-equivalent technology takes 500–1500 years.', zh_a: '此轨迹下的 2026 年有少于一亿人类，多在偏远农业社区；技术知识大体丢失；恢复到 2020 年等价技术需 500–1500 年。', en_h: 'this trajectory is in the catalog because the genre often skips it. Most counterfactual nuclear-war narratives stop at the spectacle and skip the long, slow consequences.', zh_h: '此轨迹在目录里是因为类型常跳过它。多数反事实核战叙事停在景观处，跳过漫长缓慢的后果。' },
  },
  internet: {
    convergent: { en_i: 'public internet arrives 8–12 years later through different protocols; mass adoption begins around 2008.', zh_i: '公共互联网经由不同协议晚 8–12 年到达；大众采用约从 2008 年开始。', en_a: '2026 in this trajectory looks similar to ours but with different platform incumbents; AI development is delayed by 5–8 years; specific cultural artefacts (web 2.0, social media as we know it) take different shapes.', zh_a: '此轨迹下的 2026 年与我们相似，但平台在位者不同；AI 发展延迟 5–8 年；特定文化造物（我们所知的 Web 2.0、社交媒体）呈不同形状。', en_h: 'the internet was the most over-determined technology of the late 20th century; it would have arrived in some form regardless of the specific Cold War R&D path.', zh_h: '互联网是 20 世纪晚期被过度决定的技术；无论具体的冷战研发路径如何，它都会以某种形式到达。' },
    divergent: { en_i: 'a different communication architecture (telecom-centric, slower-bandwidth, government-mediated) becomes dominant.', zh_i: '一种不同的通信架构（以电信为中心、低带宽、政府中介）成为主导。', en_a: '2026 in this trajectory has slower-but-deeper information flows; less individual reach, more institutional curation; AI develops differently and may not have arrived yet.', zh_a: '此轨迹下的 2026 年有更慢但更深的信息流；更少的个人触达、更多的制度策展；AI 发展不同，可能尚未到达。', en_h: 'this is the most plausible non-internet trajectory because it shows the technology that nearly happened (Minitel, BBSes, government videotex) and how it might have stabilised.', zh_h: '这是最可信的非互联网轨迹，因为它展示了几乎发生的技术（Minitel、BBS、政府视频数据系统）如何可能稳定。' },
    ruined: { en_i: 'no public internet means no individual-empowerment cycle; knowledge stays inside institutions; literacy gains of the late 20th century are incomplete.', zh_i: '无公共互联网意味着无个人赋权周期；知识停留在机构内；20 世纪晚期的识字收益不完整。', en_a: '2026 in this trajectory is less politically polarised, more institutionally trusted, and significantly less individually empowered; whether this is net positive is contested.', zh_a: '此轨迹下的 2026 年政治更不极化、机构更受信任、个人显著较少被赋权；这是否净正面有争议。', en_h: 'this trajectory makes visible that the internet had real costs as well as real benefits; the simple "more internet is better" framing is sentimental.', zh_h: '此轨迹让"互联网有真实代价也有真实利益"可见；简单的"越互联网越好"框架是情感性的。' },
  },
  gpt: {
    convergent: { en_i: 'a comparable AI moment arrives 24–36 months later through a different architecture or different lab; structural arc is similar.', zh_i: '可比较的 AI 时刻经由不同架构或不同实验室晚 24–36 个月到达；结构弧相似。', en_a: '2026 in this trajectory looks like our 2024 with slightly different incumbents; the macro story is unchanged.', zh_a: '此轨迹下的 2026 年看起来像我们的 2024 年，但在位者略不同；宏观故事不变。', en_h: 'most "this specific event was necessary" claims are over-stated. The transformer architecture, the scale, the data, and the capital were all in place by 2020; the moment was inevitable within a 3-year window.', zh_h: '多数"这一具体事件是必要的"主张被夸大。变换器架构、规模、数据、资本在 2020 年都已就位；该时刻在 3 年窗口内不可避免。' },
    divergent: { en_i: 'AI development takes a fundamentally different path (e.g. neuro-symbolic, embodied-first, smaller-models) that produces qualitatively different capabilities.', zh_i: 'AI 发展走根本不同的路径（如神经—符号、具身优先、小模型），产出质上不同的能力。', en_a: '2026 in this trajectory has AI that is better at certain narrow tasks, worse at general-purpose chat, deployed differently across society; the social-cultural impact has different shape.', zh_a: '此轨迹下的 2026 年的 AI 在某些窄任务上更好、在通用聊天上更差，跨社会的部署不同；社会文化影响有不同形状。', en_h: 'this is the most useful counterfactual for thinking about AI, because it shows that "AI" is a path-dependent technology category and the path was not the only possible one.', zh_h: '这是关于 AI 思考最有用的反事实，因为它展示了"AI"是一个路径依赖的技术类别，且该路径不是唯一可能的。' },
    ruined: { en_i: 'no GPT moment in 2022 means the AI-mediated information regime that started in 2023–24 takes 2–4 years longer to start; the labour-market effects begin later.', zh_i: '2022 年无 GPT 时刻意味着 2023–24 年开始的 AI 中介信息制度晚 2–4 年开始；劳动力市场效应更晚开始。', en_a: '2026 in this trajectory has stable knowledge work, slower productivity growth in cognitive sectors, and less concentrated AI capital; the costs and benefits are real and different.', zh_a: '此轨迹下的 2026 年有稳定的知识工作、认知部门较慢的生产率增长、较不集中的 AI 资本；代价与利益真实且不同。', en_h: 'this is the trajectory most directly relevant to 2026 readers because it asks them to take seriously that the world they live in is one of several plausible 2020s, not the only one.', zh_h: '这是与 2026 年读者最直接相关的轨迹，因为它要求他们认真对待"他们所居住的世界是若干可信 2020 年代之一，不是唯一一个"。' },
  },
};

function runGen() {
  const p = $('#d-point').value, t = $('#d-traj').value;
  const point = points[p];
  const traj = trajectories[p][t];
  const lang = html.getAttribute('data-lang');
  const tName = { convergent: { en: 'Convergent', zh: '收敛' }, divergent: { en: 'Divergent', zh: '分叉' }, ruined: { en: 'Ruined', zh: '毁灭' } };
  if (lang === 'en') {
    $('#gen-out').innerHTML = `
      <h4>${point.en_t} · ${tName[t].en}</h4>
      <div class="lab">Immediate downstream effect</div><p>${traj.en_i}</p>
      <div class="lab">50-year arc</div><p>${traj.en_a}</p>
      <div class="lab">Honest meta-read</div><p style="color: var(--branch); font-style: italic;">${traj.en_h}</p>
      <p style="margin-top: 18px; font-size: 12px; color: var(--dim); font-family: var(--mono);">TEMPLATED · NOT A FORECAST · NOT A NOVEL</p>`;
  } else {
    $('#gen-out').innerHTML = `
      <h4>${point.zh_t} · ${tName[t].zh}</h4>
      <div class="lab">即时下游效应</div><p>${traj.zh_i}</p>
      <div class="lab">50 年弧线</div><p>${traj.zh_a}</p>
      <div class="lab">诚实元读数</div><p style="color: var(--branch); font-style: italic;">${traj.zh_h}</p>
      <p style="margin-top: 18px; font-size: 12px; color: var(--dim); font-family: var(--mono);">模板化 · 非预测 · 非小说</p>`;
  }
}
$('#gen-go').addEventListener('click', runGen);

const probes = [
  { id: 'useful-divergence', en_t: 'Useful Divergence', zh_t: '有用的分叉',
    en_h: 'Why are some divergence points more useful than others?', zh_h: '为何某些分叉点比其他更有用？',
    en_a: `Three properties make a divergence point useful for counterfactual reasoning, and most of the genre\'s favourites do not have them.

(1) The point must be locally specific. "What if Rome had not fallen" is too diffuse; "what if Justinian\'s plague had not struck Constantinople in 541" is specific enough to model. The genre rewards diffuse divergences because they are evocative; the analytic value is in the specific ones.

(2) The point must be structurally consequential. "What if a different king had won at Hastings" is specific but the structural difference 100 years downstream is small; the Norman conquest was over-determined by demographic and military structural factors. "What if printing had not arrived in Europe by 1500" is structurally consequential because printing was the gating technology for the Reformation, the scientific revolution, and modern bureaucracy.

(3) The point must have a non-trivial counterfactual envelope. Some divergence points fail because the counterfactual collapses back to actual history within decades (most "great person" divergences); others fail because they have no plausible counterfactual at all (most physics-violating divergences). The useful range is in the middle: divergences with 100–500 years of plausible alternative arc.

The genre\'s favourite divergences (Hitler dying in WWI, JFK not assassinated, the Library of Alexandria not burning) score well on specificity and badly on the other two; the alternate timelines they generate are mostly costume drama. The catalog of divergence points in this generator was selected for all three properties; that is why some are unromantic (no Black Death, no GPT moment) and most genre-readers would not pick them.

What this engine refuses to pretend: that all "what ifs" are created equal. They are not. The good ones produce useful constraints on how we think about contingency; the bad ones produce entertaining but uncalibrated stories.`,
    zh_a: `三种属性让分叉点对反事实推理有用，多数类型的最爱都没有它们。

(1) 该点必须本地具体。"若罗马未陨落"太弥散；"若 541 年查士丁尼瘟疫未袭击君士坦丁堡"足够具体以建模。类型奖励弥散的分叉因为它们富感染力；分析价值在具体的那些里。

(2) 该点必须在结构上有后果。"若哈斯廷斯由不同的国王获胜"具体，但 100 年下游的结构差异小；诺曼征服由人口与军事结构因素过度决定。"若印刷在 1500 年前未到达欧洲"在结构上有后果，因为印刷是宗教改革、科学革命与现代官僚制的把关技术。

(3) 该点必须有非琐碎的反事实包络。某些分叉点失败因为反事实在数十年内坍塌回实际历史（多数"伟人"分叉）；另一些失败因为它们根本没有可信反事实（多数违反物理的分叉）。有用的范围在中间：拥有 100–500 年可信替代弧的分叉。

类型最爱的分叉（希特勒死于一战、肯尼迪未被刺、亚历山大图书馆未被烧）在具体性上得分好、在其他两点上得分差；它们生成的替代时间线多半是戏装剧。本生成器目录里的分叉点为所有三种属性选择；这是为何某些不浪漫（无黑死病、无 GPT 时刻）、且多数类型读者不会挑它们。

本引擎拒绝假装的事：所有"如果"是平等创造的。它们不是。好的产生关于我们如何思考偶然性的有用约束；坏的产生有娱乐性但未校准的故事。` },
  { id: 'tells-us-what', en_t: 'What Counterfactual Tells Us', zh_t: '反事实告诉我们什么',
    en_h: 'What does counterfactual reasoning actually tell us about real history?', zh_h: '反事实推理实际告诉我们真实历史什么？',
    en_a: `Three things, all weaker than the genre suggests, all useful in their proper register.

(1) Which causal factors were over-determined vs under-determined. If a divergence point produces a convergent timeline (alternate path, similar end-state), the structural forces were doing most of the work; the specific events were partially decorative. If a divergence point produces a divergent timeline (different end-state), the specific events were genuinely consequential. This distinction is hard to see from inside actual history because there is only one trajectory; counterfactual analysis is the cheapest tool for surfacing it.

(2) The texture of contingency. History feels inevitable in retrospect because we know how it ended; counterfactual reasoning restores the felt-uncertainty of the moment. This has practical use for thinking about present situations: most current events feel more deterministic than they actually are, and the felt-determinism is itself an artifact of how we narrate, not how the world works. Counterfactual practice retrains the narrator.

(3) Robustness of our values to alternate paths. We can ask: is the value we attribute to a current institution (democracy, market economy, internet, science) value because of its specific historical path, or because of structural properties it would have under any plausible alternate path? Counterfactual analysis is the only way to tell. If the institution has value only in our specific path, the value is contingent; if it has value across most plausible paths, the value is structural. The genre rarely makes this distinction; it matters.

What counterfactual reasoning does not tell us. (1) What "would have happened" — that is fiction. (2) Whether an alternate timeline is morally better or worse — that is ethics. (3) Whether a current trajectory is on the right track — that requires judgment about the future, not the past.

What this engine refuses to pretend: that the value of counterfactual reasoning is settled. It is not; the discipline (cliometrics, alternate history as analytical tool) is younger than most realise and its claims are appropriately modest.`,
    zh_a: `三件事，全部比类型暗示的更弱，全部在其恰当语域内有用。

(1) 哪些因果因素被过度决定 vs 不足决定。若分叉点产出收敛时间线（替代路径、相似终态），结构力量在做大部分工作；具体事件部分是装饰。若分叉点产出分叉时间线（不同终态），具体事件真正有后果。从实际历史内部很难看见这一区分，因为只有一条轨迹；反事实分析是浮现它最便宜的工具。

(2) 偶然性的质地。历史回头看感觉不可避免，因为我们知道它如何结束；反事实推理恢复时刻的被感受到的不确定性。这对思考当下情境有实际用途：多数当前事件比实际感觉更决定性，被感受到的决定性本身是我们如何叙述的产物，不是世界如何运作。反事实实践重训叙述者。

(3) 我们的价值观对替代路径的鲁棒性。我们可以问：我们归于某当前制度（民主、市场经济、互联网、科学）的价值，是因为其特定历史路径，还是因为它在任何可信替代路径下都会有的结构性属性？反事实分析是唯一辨别方式。若制度仅在我们特定路径下有价值，该价值是偶然的；若它在多数可信路径上有价值，该价值是结构性的。类型很少做此区分；它要紧。

反事实推理不告诉我们的事。(1) "会发生什么"——那是虚构。(2) 替代时间线在道德上更好或更坏——那是伦理学。(3) 当前轨迹是否在正确轨道上——那需要对未来的判断，不是过去的。

本引擎拒绝假装的事：反事实推理的价值已被定论。它没有；该学科（计量历史学、作为分析工具的替代历史）比多数人意识到的更年轻，其主张恰当地谦逊。` },
  { id: 'why-uncomfortable', en_t: 'Uncomfortable Honesty', zh_t: '不舒服的诚实',
    en_h: 'Why do honest alt-histories make most readers uncomfortable?', zh_h: '为何诚实的替代历史让多数读者不舒服？',
    en_a: `Three reasons, in order of how often they are admitted.

(1) They reveal that current institutions are partly contingent. The reader who values democracy notices that most counterfactuals produce non-democratic stable states; the reader who values their nation notices that most counterfactuals produce different national configurations or none at all. This is uncomfortable because we want our valued things to be over-determined, and they are usually not. The honest output makes the contingency visible; the genre soft-pedals it for comfort.

(2) They reveal that historical trauma was sometimes structurally productive. Honest counterfactuals show that some traumas (the Black Death, certain wars, certain collapses) had downstream effects we now value (peasant economic empowerment, post-war institutional rebuilding, post-collapse innovation). This does not justify the trauma; it does complicate the simple "trauma is bad" narrative the genre prefers. The honest output forces engagement with this complication.

(3) They reveal that our moral certainty is path-dependent. Most readers believe certain things are right or wrong absolutely; honest counterfactuals show that the moral certainty often depends on the specific path that produced our current sensibility. In a different path the same readers might hold different certainties. This is the most uncomfortable revelation because it threatens the sense that one\'s values are sourced from something deeper than contingent history; sometimes the answer is no.

The honest position. The discomfort is not a bug; it is the point. A counterfactual generator that does not produce some discomfort is not doing the work; it is producing comfort with extra steps. The Synthetic History generator was tuned to produce useful discomfort and to label it explicitly as such, rather than smoothing it for the genre\'s ease.

What this engine refuses to pretend: that the discomfort is misplaced. It is not. The reader who feels uncomfortable reading honest alt-history has correctly noticed something the genre tries to obscure; the right response is to sit with the discomfort, not to dismiss the genre.`,
    zh_a: `三个理由，按其被承认的频率排序。

(1) 它们揭示当前制度部分偶然。重视民主的读者注意到多数反事实产出非民主的稳定态；重视其国族的读者注意到多数反事实产出不同的国族配置或根本没有。这令人不舒服，因为我们希望被珍视之物被过度决定，而它们通常不是。诚实输出让偶然性可见；类型为安慰而轻描淡写。

(2) 它们揭示历史创伤有时在结构上有产出。诚实的反事实展示某些创伤（黑死病、某些战争、某些崩溃）有我们现在珍视的下游效应（农民经济赋权、战后制度重建、崩溃后创新）。这不为创伤辩护；它确实让类型偏好的简单"创伤是坏的"叙事变得复杂。诚实输出强迫与此复杂化交涉。

(3) 它们揭示我们的道德确定性是路径依赖的。多数读者相信某些事是绝对对或绝对错的；诚实的反事实展示道德确定性常依赖于产出我们当前感受性的具体路径。在不同路径上，同样的读者可能持有不同的确定性。这是最令人不舒服的揭示，因为它威胁"一个人的价值观源自比偶然历史更深之物"的感觉；有时答案是不。

诚实立场。不舒服不是 bug；它是要点。一个不产出某种不舒服的反事实生成器没在做工作；它是在多余步骤后产出安慰。合成历史生成器被调谐以产出有用的不舒服，并显式将其标记为此，而非为类型的便利平滑它。

本引擎拒绝假装的事：不舒服是放错了地方。它不是。读诚实替代历史感到不舒服的读者，正确地注意到了类型试图遮蔽的某物；恰当回应是与不舒服同坐，不是斥责类型。` },
  { id: 'genre-sells', en_t: 'What the Genre Sells', zh_t: '类型卖什么',
    en_h: 'Why does most published alt-history feel formulaic?', zh_h: '为何多数已出版的替代历史感觉公式化？',
    en_a: `Because the genre sells comfort wearing a counterfactual costume.

Three patterns the genre rewards. (1) The "we won bigger" trajectory. A nation\'s past defeat becomes a victory in the alternate, and the rest of history is decorated around the victory. This is identity-flattering and analytically useless because it does not engage the structural forces that produced the actual outcome. Most "what if X power had won" books fall here. (2) The "single hero" trajectory. A single individual\'s death, survival, or different choice produces an entirely different world. This is dramatically rewarding and historically wrong; the genre projects individual agency at scales the actual world rarely allows. (3) The "comfort utopia" trajectory. The alternate timeline is a place the reader would prefer to live, with current problems removed and current pleasures intact. This is psychologically comforting and analytically useless because it does not respect the trade-off structure that produces real historical configurations.

Three patterns the genre punishes but the discipline rewards. (1) The "we lost more" trajectory. The alternate is worse than ours in ways that are structurally plausible. This is uncomfortable but informative. (2) The "structural over-determination" trajectory. The alternate ends up looking very similar to ours despite a major divergence, because the structural forces dominated the specific event. This is dramatically boring and analytically useful. (3) The "ruined possibility" trajectory. The alternate forecloses something we now value, making visible that the path we took had real costs as well as benefits. This is uncomfortable in a different way and is exactly the discipline\'s most useful product.

The honest synthesis. Published alt-history is shaped by reader incentive structures more than by analytical rigour; the genre and the discipline have diverged. Synthetic History generates the analytic-discipline outputs, which is why it feels different from genre alt-history; it is. The trade is real and conscious.

What this engine refuses to pretend: that the genre is bad. It is fine as fiction. It is not the same activity as analytical alt-history; conflating them is what produces reader confusion when they encounter the latter.`,
    zh_a: `因为类型卖穿着反事实服装的安慰。

类型奖励的三种模式。(1) "我们赢得更大"轨迹。一个国族的过去失败变成替代中的胜利，历史的其余部分围绕胜利被装饰。这奉承身份且分析上无用，因为它不交涉产出实际结果的结构力量。多数"若 X 势力获胜"的书落于此。(2) "单一英雄"轨迹。单一个人的死亡、生存或不同选择产出完全不同的世界。这戏剧上有奖励且历史上错；类型在实际世界很少允许的尺度上投射个人能动性。(3) "安慰乌托邦"轨迹。替代时间线是读者会更愿意居住的地方，当前问题被移除、当前快乐完好。这心理上安慰且分析上无用，因为它不尊重产出真实历史配置的取舍结构。

类型惩罚但学科奖励的三种模式。(1) "我们输得更多"轨迹。替代以结构上可信的方式比我们的更差。这令人不舒服但有信息量。(2) "结构性过度决定"轨迹。替代尽管有重大分叉但最终看起来与我们的非常相似，因为结构力量主导了具体事件。这戏剧上无聊且分析上有用。(3) "毁灭可能性"轨迹。替代封堵了我们现在珍视之物，让"我们走过的路有真实代价也有利益"可见。这以不同方式令人不舒服，且恰是学科最有用的产品。

诚实综合。已出版的替代历史更多被读者激励结构塑造，而非被分析严谨塑造；类型与学科已分叉。合成历史生成分析—学科的输出，这就是为什么它感觉与类型替代历史不同；它就是。交易真实且有意识。

本引擎拒绝假装的事：类型不好。它作为虚构没问题。它不是与分析替代历史同样的活动；混淆它们正是读者遭遇后者时产生困惑的原因。` },
  { id: 'using-it-well', en_t: 'Using This Generator Well', zh_t: '善用此生成器',
    en_h: 'How should I actually use this generator?', zh_h: '我实际应该如何使用此生成器？',
    en_a: `Three uses, in declining order of confidence.

(1) Calibrate your sense of contingency. Generate the same divergence point with all three trajectories (convergent, divergent, ruined). Notice which feels most plausible to you, then ask: is that judgment based on structural reasoning, or on the trajectory most flattering to your current values? The answer is usually the latter at first reading; correcting it is the calibration.

(2) Test your own narratives. If you hold a strong belief about why the modern world is the way it is ("the internet caused X," "the post-war order produced Y"), pick a divergence point upstream of that belief and run all three trajectories. If the convergent trajectory still produces X or Y, your causal narrative was overweight on the specific event; the structural forces were doing most of the work. This is the cheapest available test of one\'s own historical theories.

(3) Practice analytical discipline. The discipline of asking "what would the trajectory be if I removed event X" before stating "event X caused Y" is rare even among trained historians; the generator is a low-cost way to practice it. Most readers improve their causal reasoning measurably within 6–12 months of regular use.

What it is not for. (1) Entertainment, primarily. The trajectories are templated; novelistic engagement requires a different tool. (2) Forecasting, ever. Counterfactual reasoning about the past does not produce predictions about the future; using it as one is the most expensive misuse of the tool. (3) Identity validation. The generator is calibrated to refuse identity-flattering outputs; readers seeking validation will find the discomfort unhelpful.

The recommendation. Use the generator quarterly rather than weekly. Counterfactual practice is more like meditation than like consumption; the value compounds with consistent low-frequency engagement and degrades with high-frequency engagement (which produces fatigue and pattern-matching to the templates).

What this engine refuses to pretend: that the generator is necessary. It is not; many trained historians run this practice internally without any external tool. The generator is a public, pedagogical version of an exercise the discipline has run in private for decades.`,
    zh_a: `三种用途，按置信度递减。

(1) 校准你的偶然性感觉。用全部三条轨迹（收敛、分叉、毁灭）生成同一分叉点。注意哪一条对你感觉最可信，然后问：那个判断是基于结构推理，还是基于最奉承你当前价值观的轨迹？初读时答案通常是后者；纠正它就是校准。

(2) 测试你自己的叙事。若你持有关于现代世界为何如此的强信念（"互联网导致了 X"、"战后秩序产出了 Y"），挑选该信念上游的一个分叉点并跑所有三条轨迹。若收敛轨迹仍产出 X 或 Y，你的因果叙事在具体事件上过重；结构力量在做大部分工作。这是检验一个人自己历史理论最便宜的可用测试。

(3) 练习分析纪律。在陈述"事件 X 导致了 Y"之前问"若我移除事件 X 轨迹会是什么"的纪律，即使在受训历史学家中也罕见；生成器是低成本练习它的方式。多数读者在规律使用 6–12 个月内可测量地改善因果推理。

它不擅长的事。(1) 主要不为娱乐。轨迹是模板化的；小说式参与需要不同工具。(2) 永远不为预测。关于过去的反事实推理不产出关于未来的预测；以此使用是工具最贵的误用。(3) 身份认证。生成器被校准以拒绝奉承身份的输出；寻求认证的读者会发现不舒服无帮助。

建议。按季度而非按周使用生成器。反事实实践更像冥想而非消费；价值随一致的低频参与复利，随高频参与（其产出疲劳与对模板的模式匹配）降级。

本引擎拒绝假装的事：生成器是必要的。它不是；许多受训历史学家在内部运行此实践，无任何外部工具。生成器是学科数十年来私下运行过的练习的公开教学版本。` },
];

function renderProbes() {
  $('#prompt-grid').innerHTML = probes.map(p => `<button class="prompt-btn" data-id="${p.id}"><span class="pt-tag">probe</span><strong><span lang="en">${p.en_t}</span><span lang="zh">${p.zh_t}</span></strong><div style="margin-top:6px; color: var(--muted); font-size: 12px;"><span lang="en">${p.en_h}</span><span lang="zh">${p.zh_h}</span></div></button>`).join('');
  $$('.prompt-btn').forEach(b => b.addEventListener('click', () => { const p = probes.find(x => x.id === b.dataset.id); const lang = html.getAttribute('data-lang'); $('#mirror-out').textContent = lang === 'en' ? p.en_a : p.zh_a; }));
}
renderProbes();

function heuristic(text) {
  const lang = html.getAttribute('data-lang');
  const t = text.toLowerCase();
  const found = [];
  for (const k in points) { if (new RegExp(k, 'i').test(t)) found.push(points[k].en_t); }
  if (lang === 'en') return `Heuristic read · divergence points named: ${found.length ? found.join(' · ') : 'none flagged'}.\n\nThe canned probes above are cleaner than this fallback.`;
  return `启发式读取 · 命名的分叉点：${found.length ? found.join(' · ') : '无标记'}。\n\n上方的预设探针比这个回退更干净。`;
}
$('#mirror-go').addEventListener('click', () => { const text = $('#mirror-input').value.trim(); if (!text) return; $('#mirror-out').textContent = heuristic(text); });
