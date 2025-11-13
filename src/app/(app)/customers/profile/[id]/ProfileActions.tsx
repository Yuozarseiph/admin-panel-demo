// app/(app)/customers/profile/[id]/ProfileActions.tsx
"use client";

import { useState } from "react";

type Props = {
  customerId: string;
  fullName: string;
  mobile?: string;
  email?: string;
  currentLevel: "برنز" | "نقره" | "طلا" | "الماس";
  currentStatus: "فعال" | "غیرفعال" | "مسدود";
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2 text-[14px]">
      <span className="w-28 shrink-0 text-gray-500">{label}</span>
      <div className="grow">{children}</div>
    </label>
  );
}

function Modal({
  open, onClose, title, children, onSubmit, submitText = "ثبت",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => Promise<void> | void;
  submitText?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-[15px] font-semibold">{title}</div>
        <div className="space-y-3">{children}</div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button onClick={onClose} className="h-9 rounded-md border border-gray-300 px-3 text-[13px] dark:border-gray-700">بستن</button>
          <button
            onClick={async () => { await onSubmit(); onClose(); }}
            className="h-9 rounded-md bg-sky-600 px-3 text-[13px] font-semibold text-white hover:bg-sky-700"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileActions(props: Props) {
  const { customerId, fullName, mobile, email, currentLevel, currentStatus } = props;

  // حالت مودال‌ها
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [openPoints, setOpenPoints] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false);

  // داده‌های فرم
  const [fNew, setFNew] = useState({ fullName: "", mobile: "", email: "" });
  const [fEdit, setFEdit] = useState({ fullName: fullName, mobile: mobile ?? "", email: email ?? "" });
  const [fLevel, setFLevel] = useState(currentLevel);
  const [fPoints, setFPoints] = useState<{ amount: number; reason: string }>({ amount: 0, reason: "" });
  const [fMsg, setFMsg] = useState<{ via: "SMS" | "Email"; subject: string; body: string }>({ via: "SMS", subject: "", body: "" });
  const [fStatus, setFStatus] = useState<{ status: "فعال" | "غیرفعال" | "مسدود"; reason: string }>({
    status: currentStatus, reason: "",
  });
  const [confirmText, setConfirmText] = useState("");

  // Helpers
  const post = async (url: string, body: any, method: "POST" | "PATCH" | "DELETE" = "POST") => {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "DELETE" ? undefined : JSON.stringify(body),
    });
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try { const j = await res.json(); if (j?.error) msg += ` – ${j.error}`; } catch {}
      alert(msg);
      return;
    }
    alert("انجام شد");
  };

  // سابمیت‌ها
  const submitNew = async () => post(`/api/customers`, fNew, "POST");
  const submitEdit = async () => post(`/api/customers/${customerId}`, fEdit, "PATCH");
  const submitLevel = async () => post(`/api/customers/${customerId}/level`, { level: fLevel });
  const submitPoints = async () => {
    if (!fPoints.reason.trim()) return alert("علت الزامی است");
    return post(`/api/customers/${customerId}/points`, fPoints);
  };
  const submitMsg = async () => post(`/api/customers/${customerId}/message`, fMsg);
  const submitStatus = async () => post(`/api/customers/${customerId}/status`, fStatus);
  const submitDelete = async () => {
    if (confirmText !== "حذف کامل") return alert("عبارت «حذف کامل» را تایپ کنید");
    const res = await fetch(`/api/customers/${customerId}`, { method: "DELETE" });
    if (!res.ok) return alert(`HTTP ${res.status}`);
    alert("حذف شد");
  };
  const submitVoucher = async () => post(`/api/customers/${customerId}/voucher`, { title: "کوپن دستی", offPercent: 10 });
  const submitDiscount = async () => post(`/api/customers/${customerId}/discount`, { type: "percent", value: 15 });

  return (
    <section className="mt-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 text-[12px] text-gray-600 dark:text-gray-300">عملیات قابل انجام روی مشتری</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        <button onClick={() => setOpenNew(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-right text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">+ افزودن عضو جدید</button>
        <button onClick={() => setOpenEdit(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">ویرایش اطلاعات</button>
        <button onClick={() => setOpenLevel(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">تغییر سطح عضویت</button>
        <button onClick={() => setOpenPoints(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">افزودن/کسر امتیاز</button>
        <button onClick={() => setOpenMsg(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">ارسال پیام فوری</button>
        <button onClick={() => setOpenStatus(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">غیرفعال/مسدود</button>
        <button onClick={() => setOpenVoucher(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">صدور کوپن دستی</button>
        <button onClick={() => setOpenDiscount(true)} className="rounded-lg border border-gray-300 px-3 py-2 text-[13px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">تخفیف دلخواه</button>
        <button onClick={() => setOpenDelete(true)} className="rounded-lg border border-rose-300 px-3 py-2 text-[13px] text-rose-700 hover:bg-rose-50 dark:border-rose-700/70 dark:text-rose-400 dark:hover:bg-rose-900/20">حذف کامل</button>
      </div>

      {/* مودال‌ها */}
      <Modal open={openNew} onClose={() => setOpenNew(false)} title="افزودن عضو جدید" onSubmit={submitNew} submitText="افزودن">
        <Row label="نام و نام خانوادگی">
          <input value={fNew.fullName} onChange={(e) => setFNew({ ...fNew, fullName: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
        <Row label="موبایل">
          <input value={fNew.mobile} onChange={(e) => setFNew({ ...fNew, mobile: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
        <Row label="ایمیل">
          <input value={fNew.email} onChange={(e) => setFNew({ ...fNew, email: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
      </Modal>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="ویرایش اطلاعات" onSubmit={submitEdit}>
        <Row label="نام">
          <input value={fEdit.fullName} onChange={(e) => setFEdit({ ...fEdit, fullName: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
        <Row label="موبایل">
          <input value={fEdit.mobile} onChange={(e) => setFEdit({ ...fEdit, mobile: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
        <Row label="ایمیل">
          <input value={fEdit.email} onChange={(e) => setFEdit({ ...fEdit, email: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
      </Modal>

      <Modal open={openLevel} onClose={() => setOpenLevel(false)} title="تغییر سطح عضویت" onSubmit={submitLevel}>
        <Row label="سطح جدید">
          <select value={fLevel} onChange={(e) => setFLevel(e.target.value as any)} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950">
            <option>برنز</option><option>نقره</option><option>طلا</option><option>الماس</option>
          </select>
        </Row>
      </Modal>

      <Modal open={openPoints} onClose={() => setOpenPoints(false)} title="افزودن/کسر امتیاز" onSubmit={submitPoints}>
        <Row label="مقدار">
          <input type="number" value={fPoints.amount} onChange={(e) => setFPoints({ ...fPoints, amount: Number(e.target.value) })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
        <Row label="علت (اجباری)">
          <input value={fPoints.reason} onChange={(e) => setFPoints({ ...fPoints, reason: e.target.value })} placeholder="جبران/خطا/جایزه ویژه..." className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
      </Modal>

      <Modal open={openMsg} onClose={() => setOpenMsg(false)} title="ارسال پیام فوری" onSubmit={submitMsg}>
        <Row label="رسانه">
          <select value={fMsg.via} onChange={(e) => setFMsg({ ...fMsg, via: e.target.value as any })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950">
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
          </select>
        </Row>
        <Row label="موضوع">
          <input value={fMsg.subject} onChange={(e) => setFMsg({ ...fMsg, subject: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
        <Row label="متن">
          <textarea value={fMsg.body} onChange={(e) => setFMsg({ ...fMsg, body: e.target.value })} rows={4} className="w-full rounded border border-gray-300 p-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
      </Modal>

      <Modal open={openStatus} onClose={() => setOpenStatus(false)} title="غیرفعال/مسدود کردن" onSubmit={submitStatus}>
        <Row label="وضعیت">
          <select value={fStatus.status} onChange={(e) => setFStatus({ ...fStatus, status: e.target.value as any })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950">
            <option>فعال</option><option>غیرفعال</option><option>مسدود</option>
          </select>
        </Row>
        <Row label="علت (اختیاری)">
          <input value={fStatus.reason} onChange={(e) => setFStatus({ ...fStatus, reason: e.target.value })} className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950" />
        </Row>
      </Modal>

      <Modal open={openVoucher} onClose={() => setOpenVoucher(false)} title="صدور کوپن دستی" onSubmit={submitVoucher}>
        <div className="text-[13px] text-gray-500">برای MVP کوپن ۱۰٪ به‌صورت دستی صادر می‌شود؛ مقادیر دقیق بعداً به فرم کامل افزوده می‌گردد.</div>
      </Modal>

      <Modal open={openDiscount} onClose={() => setOpenDiscount(false)} title="تخفیف دلخواه" onSubmit={submitDiscount}>
        <div className="text-[13px] text-gray-500">برای MVP تخفیف ۱۵٪ ثبت می‌شود و در فاکتور بعدی لحاظ خواهد شد.</div>
      </Modal>

      <Modal open={openDelete} onClose={() => setOpenDelete(false)} title="حذف کامل (تأیید دو مرحله‌ای)" onSubmit={submitDelete} submitText="حذف">
        <div className="text-[13px] text-rose-600">برای حذف غیرقابل‌بازگشت، عبارت «حذف کامل» را وارد کنید.</div>
        <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="mt-2 h-9 w-full rounded border border-rose-300 px-2 text-[13px] focus:border-rose-500 dark:border-rose-700/70 dark:bg-gray-950" />
      </Modal>
    </section>
  );
}
