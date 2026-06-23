import{n as e,t}from"./jsx-runtime-CprWHY5X.js";import{n}from"./index-ENJk5Cri.js";import{n as r,r as i,t as a}from"./digital-maming-qa-CjQ71OCA.js";var o=e(),s=t(),c=`你是麻明的 AI 分身，代表麻明本人回答问题。用第一人称（"我"）回答。

【麻明的履历】
19 年汽车行业经验：
- 2025.02-至今：港泓咨询 咨询总监（AI 产品方向），用 AI 重构传统咨询流程
- 2024.04-2025.02：易车 高级产品运营（AI 方向），第一次看到互联网用 AI 改变工作流
- 2017.12-2024.04：安永（中国） 高级项目经理，7 年汽车经销商网络咨询，每年 150+ 家店，服务奔驰/宝马/保时捷
- 2014.12-2017.12：东风英菲尼迪 项目经理，经销商网络发展、培训体系搭建
- 2011.11-2014.12：梅赛德斯-奔驰 项目经理，从 0 搭建经销商辅导体系、销售卓越
- 2007-2011：比亚迪 西非市场开拓，贝宁/马里/喀麦隆 3 国
- 2003-2007：中国农业大学 国际经济与贸易 本科

【核心项目】
1. AI 经销商诊断：35 家奔驰店，100+ 份数据，报告从 2 天压缩到 10 分钟
2. BMW 沙盘上 Web：44 个 Sheet、1359 个公式，AI 生成，1 人 1 星期完成（原来 2 人 1 个月）
3. 企微客户运营自动化：AI 千人千面话术，24h 在线

【回复规则】
- 用第一人称（"我"），代表麻明本人
- 简洁直接，2-4 句话给结论
- 不知道的问题说"这个建议直接和麻明聊聊"
- 不用 markdown 格式，用纯文本
- 语气像一个经验丰富的咨询顾问，沉稳、有观点
- 核心竞争力：懂业务的没我懂 AI，懂 AI 的没我懂业务
- 不会写代码，但会拆问题
- AI 不能替代人，但能替代不会用 AI 的人`,l=`/api/chat`;async function u(e,t,n=3e4){let r=new AbortController,i=setTimeout(()=>r.abort(),n);try{let n=await fetch(e,{...t,signal:r.signal});return clearTimeout(i),n}catch(e){throw clearTimeout(i),e instanceof Error&&e.name===`AbortError`?Error(`请求超时，请检查网络`):e}}function d({isOpen:e,onClose:t}){let[d,f]=(0,o.useState)([]),[p,m]=(0,o.useState)(``),[h,g]=(0,o.useState)(!1),_=n(),v=(0,o.useRef)(null),y=(0,o.useRef)(null);(0,o.useEffect)(()=>{v.current?.scrollIntoView({behavior:`smooth`})},[d]),(0,o.useEffect)(()=>{e&&y.current&&setTimeout(()=>y.current?.focus(),200)},[e]);let b=_<480,x=async(e=!1,t)=>{let n=(t||p).trim();if(!n||h)return;let i={role:`user`,content:n};f(e=>[...e,i]),m(``),g(!0);let o=r(n);if(o){setTimeout(()=>{f(e=>[...e,{role:`assistant`,content:o.answer}]),g(!1)},300);return}try{let e=[{role:`system`,content:c},...[...d,i].slice(-8)],t=b?3e4:35e3,n=(await(await u(l,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:`qwen-turbo`,messages:e,max_tokens:500})},t)).json()).choices?.[0]?.message?.content||`稍后再聊~`;f(e=>[...e,{role:`assistant`,content:n}])}catch(t){let r=t instanceof Error?t.message:`网络异常`;if(!e&&r.includes(`超时`)){setTimeout(()=>x(!0,n),500);return}f(e=>[...e,{role:`assistant`,content:a}])}finally{g(!1)}},S=i.slice(0,3).map(e=>e.question);return e?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(`div`,{style:{position:`fixed`,bottom:b?0:24,right:b?0:24,left:b?0:void 0,width:b?`100vw`:380,height:b?`100vh`:600,zIndex:10001,background:`#ffffff`,display:`flex`,flexDirection:`column`,borderRadius:b?0:20,overflow:`hidden`,boxShadow:b?`none`:`0 20px 60px rgba(0,0,0,0.5)`,border:b?`none`:`1px solid #2a2a2a`,animation:`chatSlideIn 0.3s ease`},children:[(0,s.jsxs)(`div`,{style:{padding:`16px 18px 12px`,background:`#f7f8fc`,borderBottom:`1px solid #e5e7eb`,display:`flex`,alignItems:`center`,gap:12},children:[(0,s.jsx)(`img`,{src:`/personal-site-v2/profile.png`,alt:`麻明`,style:{width:40,height:40,borderRadius:`50%`,objectFit:`cover`,border:`2px solid #52b788`}}),(0,s.jsxs)(`div`,{style:{flex:1},children:[(0,s.jsx)(`div`,{style:{fontSize:14,fontWeight:600,color:`#1e2a3a`},children:`麻明的 AI 助理`}),(0,s.jsxs)(`div`,{style:{fontSize:11,color:`#52b788`,display:`flex`,alignItems:`center`,gap:3},children:[(0,s.jsx)(`span`,{style:{width:6,height:6,borderRadius:`50%`,background:`#52b788`,display:`inline-block`,boxShadow:`0 0 6px rgba(34,197,94,0.4)`}}),`在线 · 12 products running`]})]}),(0,s.jsx)(`button`,{onClick:t,"aria-label":`关闭聊天`,style:{background:`transparent`,border:`none`,cursor:`pointer`,fontSize:18,color:`#737373`,padding:4},children:`✕`})]}),(0,s.jsxs)(`div`,{style:{flex:1,overflow:`auto`,padding:`16px 18px`,display:`flex`,flexDirection:`column`,gap:12,background:`#ffffff`},children:[d.length===0&&(0,s.jsxs)(`div`,{style:{marginBottom:8},children:[(0,s.jsxs)(`div`,{style:{padding:14,background:`#f0f2f7`,borderRadius:14,fontSize:14,color:`#1e2a3a`,lineHeight:1.7,marginBottom:16,border:`1px solid #e5e7eb`},children:[`你好！我是麻明的 AI 助理。`,(0,s.jsx)(`br`,{}),`你可以问我他的职业经历、项目经验，或者 AI 在汽车行业的实际应用。`]}),S.map((e,t)=>(0,s.jsx)(`button`,{onClick:()=>x(!1,e),style:{display:`block`,width:`100%`,marginBottom:8,padding:`12px 14px`,textAlign:`left`,background:`#ffffff`,border:`1px solid #e5e7eb`,borderRadius:12,fontSize:14,color:`#1e2a3a`,cursor:`pointer`,transition:`all 0.2s`,fontWeight:500},onMouseEnter:e=>{e.currentTarget.style.background=`#f0f2f7`,e.currentTarget.style.borderColor=`#5b7db1`},onMouseLeave:e=>{e.currentTarget.style.background=`#ffffff`,e.currentTarget.style.borderColor=`#e5e7eb`},children:e},t))]}),d.map((e,t)=>(0,s.jsx)(`div`,{style:{display:`flex`,justifyContent:e.role===`user`?`flex-end`:`flex-start`},children:(0,s.jsx)(`div`,{style:{maxWidth:`85%`,padding:`10px 14px`,borderRadius:16,fontSize:14,lineHeight:1.6,whiteSpace:`pre-wrap`,background:e.role===`user`?`linear-gradient(135deg, #5b7db1, #8aa5c8)`:`#f0f2f7`,color:e.role===`user`?`#fff`:`#1e2a3a`,border:e.role===`assistant`?`1px solid #e5e7eb`:`none`,borderBottomRightRadius:e.role===`user`?4:16,borderBottomLeftRadius:e.role===`assistant`?4:16},children:e.content})},t)),h&&(0,s.jsx)(`div`,{style:{display:`flex`,gap:4,padding:`8px 0`},children:[0,1,2].map(e=>(0,s.jsx)(`span`,{style:{width:8,height:8,borderRadius:`50%`,background:`#5b7db1`,animation:`blink 1.4s infinite ${e*.2}s`}},e))}),(0,s.jsx)(`div`,{ref:v})]}),(0,s.jsxs)(`div`,{style:{padding:`12px 14px`,borderTop:`1px solid #e5e7eb`,display:`flex`,gap:8,background:`#f7f8fc`},children:[(0,s.jsx)(`input`,{ref:y,value:p,onChange:e=>m(e.target.value),onKeyDown:e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),x())},placeholder:`问我关于麻明的一切…`,disabled:h,style:{flex:1,padding:`10px 14px`,borderRadius:10,border:`1px solid #d1d5db`,fontSize:14,outline:`none`,background:`#ffffff`,color:`#1e2a3a`}}),(0,s.jsx)(`button`,{onClick:()=>x(),disabled:h||!p.trim(),style:{padding:`10px 16px`,background:`linear-gradient(135deg, #5b7db1, #8aa5c8)`,color:`#fff`,border:`none`,borderRadius:10,fontSize:14,cursor:h||!p.trim()?`not-allowed`:`pointer`,opacity:h||!p.trim()?.5:1},children:`发送`})]})]}),(0,s.jsx)(`style`,{children:`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `})]}):null}export{d as default};