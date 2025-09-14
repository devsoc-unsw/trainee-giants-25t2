import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios";
import type { Results, TimeSlot } from "../types/event.types";
import { Footer } from "../components/Footer";
import { HeaderBar } from "../components/HeaderBar";

function HeatmapTimetable({
    dates,
    startHour,
    endHour,
    slots,
    onHover,
}: {
    dates: Date[];
    startHour: number;
    endHour: number;
    slots: TimeSlot[];
    onHover?: (info: { date: string; time: string; users: string[] } | null) => void;
}) {
    const rows = useMemo(() => {
        const out: { time: string; hasLabel: boolean }[] = [];
        for (let h = startHour; h <= endHour; h++) {
            const HH = h.toString().padStart(2, "0");
            out.push({ time: `${HH}:00`, hasLabel: true });
            if (h < endHour) out.push({ time: `${HH}:30`, hasLabel: false });
        }
        return out;
    }, [startHour, endHour]);

    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const dateCols = useMemo(() => dates.map((d) => iso(new Date(d))), [dates]);

    const slotMap = useMemo(() => {
        const m = new Map<string, { count: number; users: string[] }>();
        for (const s of slots) m.set(`${s.date}|${s.time}`, { count: s.count, users: s.users });
        return m;
    }, [slots]);

    const maxCount = Math.max(1, ...slots.map((s) => s.count));

    const colorFor = (count: number) => {
        if (count === 0) return "bg-white";
        const r = count / maxCount;
        if (r < 0.20) return "bg-green-100";
        if (r < 0.40) return "bg-green-200";
        if (r < 0.60) return "bg-green-300";
        if (r < 0.80) return "bg-green-400";
        return "bg-green-500";
    };

    const fmtCol = (d: Date) =>
        d.toLocaleDateString("en-AU", { weekday: "short", month: "short", day: "numeric" });

    return (
        <div className="rounded-md select-none w-full">
            {/* Header */}
            <div
                className="grid"
                style={{ gridTemplateColumns: `max-content repeat(${dates.length}, minmax(120px, 1fr))` }}
            >
                <div className="w-16" />
                {dates.map((d) => (
                    <div
                        key={d.getTime()}
                        className="h-10 flex items-center justify-center px-2 font-semibold text-gray-800"
                    >
                        <span className="block w-full text-center text-sm truncate">{fmtCol(d)}</span>
                    </div>
                ))}
            </div>

            {/* Rows */}
            {rows.map(({ time, hasLabel }, rowIdx) => (
                <div
                    key={time + rowIdx}
                    className="grid"
                    style={{ gridTemplateColumns: `max-content repeat(${dates.length}, minmax(120px, 1fr))` }}
                >
                    <div className="h-7 flex items-center justify-end pr-3 text-xs font-semibold text-gray-700 w-16">
                        {hasLabel ? time : ""}
                    </div>
                    {dateCols.map((dkey) => {
                        const k = `${dkey}|${time}`;
                        const info = slotMap.get(k);
                        const count = info?.count ?? 0;
                        const users = info?.users ?? [];
                        return (
                            <div
                                key={k}
                                className={[
                                    "h-7 border border-gray-200 transition-colors",
                                    colorFor(count),
                                ].join(" ")}
                                onMouseEnter={() => onHover?.({ date: dkey, time, users })}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}


export default function EventResultsPage() {
    const { eid } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Results | null>(null);
    const [hoverInfo, setHoverInfo] =
        useState<{ date: string; time: string; users: string[] } | null>(null);

    useEffect(() => {
        if (!eid) return;
        (async () => {
            try {
                let { data } = await api.get<Results>("/events/results", { params: { eid }, withCredentials: true });
                console.log(data);
                setData({
                    ...data,
                    event: {
                        ...data.event,
                        eventTimeSpan: {
                            ...data.event.eventTimeSpan,
                            dates: data.event.eventTimeSpan.dates.map((d) => new Date(d as any)),
                        },
                    },
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [eid]);

    if (loading) return <div className="min-h-screen w-full flex items-center justify-center text-black">Loading…</div>;
    if (!data) return <div className="min-h-screen w-full flex items-center justify-center text-red-600">No data</div>;

    const { event, timeSlots, topRestaraunt, names } = data;

    return (
        <>
            <HeaderBar />
            <div className="flex flex-col h-full w-screen bg-gradient-to-r from-[#F4975C] to-[#999999]">
                <div className="w-full h-screen flex relative">
                    <div className="bg-white shadow-xl p-6 w-full flex flex-col gap-6">
                        <h1 className="text-2xl font-bold text-center text-gray-900">{event.eventName} — Results</h1>
                        <div className="grid md:grid-cols-12 gap-6">
                            {/* Heatmap Section */}
                            <div className="md:col-span-8 bg-white rounded-lg">
                                <div className="overflow-x-auto">
                                    <HeatmapTimetable
                                        dates={event.eventTimeSpan.dates}
                                        startHour={parseInt(event.eventTimeSpan.dayStart)}
                                        endHour={parseInt(event.eventTimeSpan.dayEnd)}
                                        slots={timeSlots}
                                        onHover={setHoverInfo}
                                    />
                                </div>
                            </div>

                            {/* Participants Section */}
                            <aside className="md:col-span-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Who's in this slot?</h2>
                                <div className="min-h-40">
                                    {hoverInfo ? (
                                        <>
                                            <div className="text-sm text-gray-600 mb-2">
                                                {hoverInfo.date} — {hoverInfo.time}
                                            </div>
                                            {hoverInfo.users.length ? (
                                                <ul className="space-y-1">
                                                    {hoverInfo.users.map((u) => (
                                                        <li key={u} className="text-black text-sm">{u}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="text-sm text-gray-400">No one selected this time.</div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-sm text-gray-400">Hover a cell to see participants.</div>
                                    )}
                                </div>
                            </aside>
                        </div>

                        {/* Top restaurant */}
                        <section className="bg-gray-50 rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Top Restaurant</h2>
                            {topRestaraunt
                                ? <p className="text-gray-800 font-medium">{topRestaraunt}</p>
                                : <p className="text-gray-500">No votes yet</p>}
                        </section>

                        {/* Participants section (main list) */}
                        <section className="bg-gray-50 rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Participants</h2>
                            <div className="flex flex-wrap gap-2">
                                {names.length
                                    ? names.map((n) => (
                                        <div key={n} className="text-sm text-gray-900">
                                            {n}
                                        </div>
                                    ))
                                    : <p className="text-gray-500 text-sm">No submissions yet</p>}
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}