import{r as t,j as o,c as l,H as m}from"./index-DWOQ63V_.js";import{c as p}from"./Card-BNGmeAo2.js";import{c as h}from"./TransactionCard-DQ72JSzL.js";import{u as x}from"./useQuery-Cc2wYG2R.js";import{S as r}from"./cards-Be6IrLQE.js";import{C as f}from"./react-apexcharts.min-DFJNAUse.js";import{B as d}from"./Dashboard-B5xpIj7L.js";import"./db-DwcLxr1r.js";import"./arrow-RKXFU_Q2.js";function E({className:i}){const{data:e,loading:a}=x(h,[]),n=t.useMemo(()=>({chart:{type:"area",height:250,toolbar:{show:!1},zoom:{enabled:!1}},colors:["#396AFF"],xaxis:{categories:(e==null?void 0:e.map(s=>s.month))||[],labels:{style:{colors:"#718EBF",fontSize:"12px"}}},yaxis:{labels:{formatter(s){return(s==null?void 0:s.toLocaleString())??""},style:{colors:"#718EBF",fontSize:"12px"}}},stroke:{curve:"smooth",width:2},dataLabels:{enabled:!1},tooltip:{y:{formatter:s=>`$${s}`}},legend:{show:!1}}),[e]),c=t.useMemo(()=>[{name:"Balance",data:(e==null?void 0:e.map(s=>s.balance))||[]}],[e]);return o.jsxs("div",{className:l("space-y-4",i),children:[o.jsx(m,{children:"Balance History"}),o.jsx(p,{className:"!px-2 !pb-2",children:o.jsxs(r,{children:[o.jsx(r.When,{isTrue:a&&!(e!=null&&e.length),children:o.jsx(d,{})}),o.jsx(r.When,{isTrue:!a,children:o.jsx(f,{options:n,series:c,type:"area",height:"250"})})]})})]})}export{E as default};
