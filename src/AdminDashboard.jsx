import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  LogOut,
  MessageCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { supabase } from "./supabase";

const STATUS_OPTIONS = ["pending", "in_progress", "completed", "cancelled"];

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function statusClasses(status) {
  if (status === "completed") return "bg-emerald-500/15 text-emerald-200 border-emerald-400/20";
  if (status === "in_progress") return "bg-amber-500/15 text-amber-100 border-amber-400/20";
  if (status === "cancelled") return "bg-red-500/15 text-red-200 border-red-400/20";
  return "bg-blue-500/15 text-blue-100 border-blue-400/20";
}

function normalizeWhatsApp(contact) {
  const digits = String(contact || "").replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("971")) return digits;
  if (digits.startsWith("0")) return `971${digits.slice(1)}`;
  return digits;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-AE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function AdminDashboard({ onBack }) {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestError, setRequestError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [openingFile, setOpeningFile] = useState("");

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setCheckingSession(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setCheckingSession(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      loadRequests();
    } else {
      setRequests([]);
      setSelectedRequest(null);
    }
  }, [session]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setLoginError(error.message);
    }

    setLoggingIn(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function loadRequests() {
    setLoadingRequests(true);
    setRequestError("");

    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setRequestError(error.message);
      setRequests([]);
    } else {
      setRequests(data || []);

      if (selectedRequest) {
        const refreshed = (data || []).find((item) => item.id === selectedRequest.id);
        setSelectedRequest(refreshed || null);
      }
    }

    setLoadingRequests(false);
  }

  async function updateStatus(requestId, newStatus) {
    setUpdatingId(requestId);
    setRequestError("");

    const { data, error } = await supabase
      .from("requests")
      .update({ status: newStatus })
      .eq("id", requestId)
      .select()
      .single();

    if (error) {
      setRequestError(error.message);
    } else {
      setRequests((current) =>
        current.map((item) => (item.id === requestId ? data : item))
      );

      if (selectedRequest?.id === requestId) {
        setSelectedRequest(data);
      }
    }

    setUpdatingId(null);
  }

  async function openPrivateFile(filePath) {
    if (!filePath) return;

    setOpeningFile(filePath);
    setRequestError("");

    const { data, error } = await supabase.storage
      .from("request-files")
      .createSignedUrl(filePath, 60 * 5);

    if (error) {
      setRequestError(`Could not open file: ${error.message}`);
    } else if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    }

    setOpeningFile("");
  }

  const filteredRequests = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();

    return requests.filter((item) => {
      const matchesStatus =
        statusFilter === "all" || (item.status || "pending") === statusFilter;

      if (!matchesStatus) return false;
      if (!needle) return true;

      return [
        item.full_name,
        item.university_school,
        item.course_subject,
        item.project_type,
        item.contact,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle));
    });
  }, [requests, searchTerm, statusFilter]);

  const counts = useMemo(() => {
    return requests.reduce(
      (acc, item) => {
        const status = item.status || "pending";
        acc.total += 1;
        if (acc[status] !== undefined) acc[status] += 1;
        return acc;
      },
      {
        total: 0,
        pending: 0,
        in_progress: 0,
        completed: 0,
        cancelled: 0,
      }
    );
  }, [requests]);

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#06142E] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-200" />
          <p className="mt-4 text-blue-100">Checking admin session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#06142E] px-6 py-16 text-white">
        <div className="mx-auto max-w-md">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Drafts
            </button>
          )}

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200">
              <ShieldCheck size={28} />
            </div>

            <p className="mt-7 text-sm font-black uppercase tracking-[0.24em] text-blue-200">
              Drafts Admin
            </p>
            <h1 className="mt-3 text-3xl font-black">Private dashboard</h1>
            <p className="mt-3 leading-7 text-blue-100/80">
              Sign in with the admin account you created in Supabase.
            </p>

            <form onSubmit={handleLogin} className="mt-8 grid gap-4">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Admin email"
                autoComplete="email"
                required
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-blue-100/50 focus:border-blue-300"
              />

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-blue-100/50 focus:border-blue-300"
              />

              {loginError && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="rounded-2xl bg-blue-600 px-5 py-3.5 font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06142E] px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-200">
                  Drafts Admin
                </p>
                <h1 className="mt-1 text-2xl font-black">Request Dashboard</h1>
              </div>
            </div>
            <p className="mt-3 text-sm text-blue-100/65">{session.user.email}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-blue-100 transition hover:bg-white/10"
              >
                <ArrowLeft size={17} />
                Website
              </button>
            )}

            <button
              type="button"
              onClick={loadRequests}
              disabled={loadingRequests}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-blue-100 transition hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw size={17} className={loadingRequests ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2.5 text-sm font-bold text-red-100 transition hover:bg-red-500/25"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Total", counts.total, FileText],
            ["Pending", counts.pending, Clock3],
            ["In Progress", counts.in_progress, RefreshCw],
            ["Completed", counts.completed, CheckCircle2],
            ["Cancelled", counts.cancelled, XCircle],
          ].map(([label, value, Icon]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-blue-100/70">{label}</p>
                <Icon size={19} className="text-blue-200" />
              </div>
              <p className="mt-3 text-3xl font-black">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/60"
              />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search student, university, subject, project type, or contact"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-blue-100/45 focus:border-blue-300/40"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-2xl border border-white/10 bg-[#0B1E45] px-4 py-3 text-sm font-bold text-white outline-none"
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </div>

          {requestError && (
            <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
              {requestError}
            </div>
          )}

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-blue-100/60">
                  <th className="px-3 py-3 font-bold">Student</th>
                  <th className="px-3 py-3 font-bold">Project</th>
                  <th className="px-3 py-3 font-bold">Urgency</th>
                  <th className="px-3 py-3 font-bold">Deadline</th>
                  <th className="px-3 py-3 font-bold">Status</th>
                  <th className="px-3 py-3 font-bold">Received</th>
                  <th className="px-3 py-3 font-bold"></th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 text-blue-50 transition hover:bg-white/[0.035]"
                  >
                    <td className="px-3 py-4">
                      <p className="font-black text-white">{item.full_name || "Unnamed"}</p>
                      <p className="mt-1 text-xs text-blue-100/55">
                        {item.university_school || "—"}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="font-bold">{item.project_type || "—"}</p>
                      <p className="mt-1 text-xs text-blue-100/55">
                        {item.course_subject || "—"}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold">
                        {item.urgency || "Normal"}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-blue-100/80">{item.deadline || "—"}</td>

                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-black ${statusClasses(
                          item.status || "pending"
                        )}`}
                      >
                        {statusLabels[item.status || "pending"] || item.status}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-xs text-blue-100/55">
                      {formatDate(item.created_at)}
                    </td>

                    <td className="px-3 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(item)}
                        className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-black text-white transition hover:bg-blue-500"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loadingRequests && filteredRequests.length === 0 && (
              <div className="py-14 text-center text-blue-100/60">
                No requests match this view.
              </div>
            )}

            {loadingRequests && (
              <div className="py-14 text-center text-blue-100/60">
                <RefreshCw className="mx-auto mb-3 h-6 w-6 animate-spin" />
                Loading requests...
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedRequest && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm md:items-center md:p-6"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#081936] p-6 shadow-2xl md:rounded-[2rem] md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-200">
                  Request #{selectedRequest.id}
                </p>
                <h2 className="mt-2 text-3xl font-black text-white">
                  {selectedRequest.full_name || "Unnamed student"}
                </h2>
                <p className="mt-2 text-sm text-blue-100/60">
                  Received {formatDate(selectedRequest.created_at)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-blue-100 transition hover:bg-white/10"
                aria-label="Close request"
              >
                <XCircle size={22} />
              </button>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                ["University / School", selectedRequest.university_school],
                ["Course / Subject", selectedRequest.course_subject],
                ["Project Type", selectedRequest.project_type],
                ["Deadline", selectedRequest.deadline],
                ["Urgency", selectedRequest.urgency],
                ["Contact", selectedRequest.contact],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-200/65">
                    {label}
                  </p>
                  <p className="mt-2 font-bold text-white">{value || "—"}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-200/65">
                Project Details
              </p>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-blue-50">
                {selectedRequest.details || "No details provided."}
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-200/65">
                Uploaded Files
              </p>

              {Array.isArray(selectedRequest.file_paths) &&
              selectedRequest.file_paths.length > 0 ? (
                <div className="mt-3 grid gap-2">
                  {selectedRequest.file_paths.map((filePath, index) => (
                    <button
                      key={`${filePath}-${index}`}
                      type="button"
                      onClick={() => openPrivateFile(filePath)}
                      disabled={openingFile === filePath}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-bold text-blue-50 transition hover:bg-white/10 disabled:opacity-50"
                    >
                      <span className="min-w-0 truncate">
                        {String(filePath).split("/").pop()}
                      </span>
                      <Download size={18} className="shrink-0 text-blue-200" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-blue-100/55">No files attached.</p>
              )}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
              <select
                value={selectedRequest.status || "pending"}
                disabled={updatingId === selectedRequest.id}
                onChange={(event) =>
                  updateStatus(selectedRequest.id, event.target.value)
                }
                className="rounded-2xl border border-white/10 bg-[#0B1E45] px-4 py-3 font-bold text-white outline-none disabled:opacity-60"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>

              <a
                href={`https://wa.me/${normalizeWhatsApp(selectedRequest.contact)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 font-black text-white transition hover:brightness-95 ${
                  normalizeWhatsApp(selectedRequest.contact)
                    ? ""
                    : "pointer-events-none opacity-50"
                }`}
              >
                <MessageCircle size={19} />
                WhatsApp Student
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
