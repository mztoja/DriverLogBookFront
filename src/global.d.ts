// Deklaracje dla importów side-effect stylów (`import './X.css'`).
// TypeScript 6.0 wymaga jawnej deklaracji modułu dla takich importów (TS2882);
// react-scripts deklaruje tylko `*.module.css`, nie zwykłe `*.css`.
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
