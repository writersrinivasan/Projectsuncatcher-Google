# Project Suncatcher: Knowledge Notes

Plain-text companion to the app, for slides, handouts and speaker notes. Current as of 2 Nov 2026.

## 1. The poem from space

```
Blue marble below
Data streams in silent grace
Starlight feeds my core.
```

- **Form:** haiku (5 · 7 · 5)
- **Model:** Gemma 4 (Google's open-weights model), running on one of the satellite's four TPUs
- **Prompt:** asked to write a haiku as a TPU orbiting Earth (exact wording not published)
- **Route:** uplinked during a ground-station pass, then downlinked over **Svalbard, Norway**
- **Google:** *"Our TPUs just phoned home… from space."* Google calls it the first AI response from a data-center-class TPU in orbit.
- The team then tried space-themed limericks and prompts that asked for telemetry.

## 2. The mission

| | |
|---|---|
| Announced | 4 Nov 2025 (research paper and blog, Travis Beals, Paradigms of Intelligence) |
| Launch | 1 Oct 2026, SpaceX Transporter-18 rideshare, Vandenberg |
| Built by | Planet Labs |
| Size | Roughly fridge-sized |
| Compute | 4 Google TPUs (press reports say Trillium; Google didn't confirm) |
| Power | ~1 kW, so one TPU at a time for ~20 min |
| Checkout | ~3 weeks before the first ML workload |
| Duration | ~1 year of experiments |
| Next | 2027: two satellites, more power, laser links |

**It's not a data center yet.** It's a test of whether TPUs survive launch, radiation and heat swings.

## 3. How it works (from Google's design paper)

- **Orbit:** dawn–dusk sun-synchronous LEO with near-constant sunlight. Panels produce up to **8×** more than on Earth.
- **Cluster:** example design of **81 satellites**, ~**650 km** altitude, **1 km** radius, neighbors **100–200 m** apart.
- **Links:** free-space optics, aiming for tens of Tbps (DWDM and spatial multiplexing). Bench demo: **800 Gbps each way (1.6 Tbps)**.
- **Radiation:** Trillium v6e in a 67 MeV proton beam. HBM errors began after ~**2 krad(Si)**, against an expected 5-year dose of **750 rad(Si)**. No hard failures up to **15 krad(Si)**.
- **Economics:** roughly matches Earth energy cost per kW-year if launch drops below **~$200/kg** (mid-2030s projection).
- **Open problems:** thermal management, ground bandwidth, on-orbit reliability.

## 4. Why space? Problems on Earth

1. Power: data centers used ~415 TWh in 2024 (~1.5% of world electricity), heading to ~945 TWh by 2030 (IEA)
2. Grid connection queues of several years
3. Water for evaporative cooling (Google: ~6 billion gallons in 2023)
4. Heat density of 100+ kW per AI rack
5. Land, noise, diesel generators, local opposition
6. Carbon: gas plants filling the gap
7. Solar on the ground stops at night and in clouds
8. Permits and politics

## 5. Why space is still hard

Launch cost · getting rid of heat (radiators) · radiation · no repairs · bandwidth to Earth · debris and Kessler risk · astronomy impact · regulation and jurisdiction

## 6. The players

| Who | Status | What |
|---|---|---|
| Google | 🛰️ In orbit | Suncatcher: 4 TPUs, Gemma 4 haiku, 2027 two-satellite test |
| SpaceX / SpaceXAI | 📄 Filed | FCC filing for up to 1M compute satellites; AI1 spec (20 m × 70 m) |
| Starcloud (NVIDIA) | 🛰️ In orbit | H100 in orbit since Nov 2025, first model trained in space; 88k-satellite filing |
| Blue Origin / Amazon | 📄 Filed | Project Sunrise, 51,600 satellites (Mar 2026) |
| OpenAI | 📰 Reported | WSJ: Altman explored buying Stoke Space; Stargate is on Earth |
| Anthropic | 🌍 Earth | No space program; uses TPUs, Trainium and GPUs on Earth |
| Meta | 🌍 Earth | Multi-GW campuses, nuclear and gas deals |
| Microsoft | 🌍 Earth | Azure Space ground-station partnerships |
| China (ADA Space) | 🛰️ In orbit | Three-Body Computing Constellation: 12 satellites (May 2025), goal ~2,800 |

## 7. Sources

- Google Research blog (Nov 2025): https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/
- The Next Web: https://thenextweb.com/news/google-suncatcher-satellite-first-ai-response-gemma-haiku
- Interesting Engineering: https://interestingengineering.com/ai-robotics/google-space-data-center-orbital-poem
- Fortune: https://fortune.com/2026/10/10/google-project-suncatcher-ai-data-centers-space-satellite-launch-orbital-computing-spacex-blue-origin-artificial-intelligence-energy-demand/
- DCD on SpaceX filing: https://www.datacenterdynamics.com/en/news/spacex-files-for-million-satellite-orbital-ai-data-center-megaconstellation/
- CNBC: https://www.cnbc.com/2026/06/21/do-space-based-ai-data-centers-make-economic-sense.html
- IEA Energy and AI: https://www.iea.org/reports/energy-and-ai
