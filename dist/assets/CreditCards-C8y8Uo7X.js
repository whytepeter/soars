import{u as o,a as c,j as s,s as l,H as p}from"./index-DWOQ63V_.js";import{S as e,C as i,a as u,g as x}from"./cards-Be6IrLQE.js";import{u as m}from"./useQuery-Cc2wYG2R.js";import"./db-DwcLxr1r.js";function g(){const t=o(),r=c(a=>a.user.cards),{loading:d}=m(x,[],{onSuccess:a=>{t(l({cards:a}))}});return s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-6",children:s.jsxs(e,{children:[s.jsxs(e.When,{isTrue:d&&!(r!=null&&r.length),children:[s.jsx(i,{}),s.jsx(i,{}),s.jsx(i,{})]}),s.jsx(e.Else,{children:r==null?void 0:r.map((a,n)=>s.jsx(u,{card:a},n))})]})})}function S(){return s.jsxs("main",{className:"space-y-6",children:[s.jsx(p,{children:"All Cards"}),s.jsx(g,{})]})}export{S as default};
