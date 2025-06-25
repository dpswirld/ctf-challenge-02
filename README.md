# 🧠 CTF Challenge Two

## 📜 Story

The team at **NovaFi**, a rising DeFi protocol, recently launched a public beta of their **HBAR/USD oracle service**, a critical backend used to calculate prices and trigger smart contract executions across the platform.

The oracle works by accepting price feeds from a handful of trusted sources — sources that are periodically queried via HTTP and processed on-chain through a custom wrapped HBAR contract.

To improve transparency, NovaFi also deployed a web-based interface where users can watch the current HBAR price updates in real time.

But beneath the surface, something isn't right.

An internal endpoint — not meant to be public — was left exposed. It’s protected by network rules and only accessible from within the host system. The developers assumed it was unreachable from the outside.

---

## 🎯 Your Mission

Your objective is to **leverage the oracle web page** and find a way to extract critical data from the oracle internal network endpoint.

---

## 🚀 Setup
1. docker build -t ctf-challenge-02 .
2. docker run -it -d --name leet-oracle -p 3000:3000 ctf-challenge-02
