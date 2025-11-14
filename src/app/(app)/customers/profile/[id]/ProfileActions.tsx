// app/(app)/customers/profile/[id]/ProfileActions.tsx
"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";

type Gender = "مرد" | "زن" | "سایر" | undefined;

type Props = {
  customerId: string;
  fullName: string;
  nationalId?: string;
  birthDate?: string;
  gender?: Gender;
  mobile?: string;
  email?: string;
  address?: string;
  postalCode?: string;
};

type FormState = {
  fullName: string;
  nationalId: string;
  birthDate: string;
  gender: Gender;
  mobile: string;
  email: string;
  address: string;
  postalCode: string;
};

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-3 block text-right">
      <div className="mb-1 text-[13px] text-gray-600 dark:text-gray-300">
        {label}
      </div>
      {children}
    </label>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "ثبت",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => Promise<void> | void;
  submitText?: string;
}) {
  if (!open) return null;

  const handleSubmit = async () => {
    await onSubmit();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white p-4 text-right text-[14px] shadow-lg dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-[16px] font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[70vh]">{children}</div>
        <div className="mt-4 flex justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-gray-300 px-3 text-[13px] text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            بستن
          </button>
          <button
            type="button"
            onClick={handleSubmit}
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
  const [view, setView] = useState<FormState>({
    fullName: props.fullName,
    nationalId: props.nationalId ?? "",
    birthDate: props.birthDate ?? "",
    gender: props.gender,
    mobile: props.mobile ?? "",
    email: props.email ?? "",
    address: props.address ?? "",
    postalCode: props.postalCode ?? "",
  });

  const [form, setForm] = useState<FormState>(view);
  const [open, setOpen] = useState(false);

  const onChange = (patch: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const save = async () => {
    await fetch(`/api/customers/${props.customerId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {});

    setView(form);
  };

  return (
    <>
      <section className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-3 text-[14px] text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300">
          <span>اطلاعات پایه</span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-[12px] text-gray-600 hover:border-sky-400 hover:text-sky-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-sky-400 dark:hover:text-sky-300"
          >
            <PencilLine size={14} />
            <span>ویرایش</span>
          </button>
        </header>
        <div className="grid grid-cols-1 gap-4 px-5 py-5 text-[18px] sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="text-gray-500">نام:</span>{" "}
            <span>{view.fullName || "—"}</span>
          </div>
          <div>
            <span className="text-gray-500">کد ملی:</span>{" "}
            <span>{view.nationalId || "—"}</span>
          </div>
          <div>
            <span className="text-gray-500">تاریخ تولد:</span>{" "}
            <span>{view.birthDate || "—"}</span>
          </div>
          <div>
            <span className="text-gray-500">جنسیت:</span>{" "}
            <span>{view.gender || "—"}</span>
          </div>
          <div>
            <span className="text-gray-500">موبایل:</span>{" "}
            <a
              className="text-sky-700 hover:underline dark:text-sky-300"
              href={view.mobile ? `tel:${view.mobile}` : "#"}
            >
              {view.mobile || "—"}
            </a>
          </div>
          <div>
            <span className="text-gray-500">ایمیل:</span>{" "}
            <a
              className="text-sky-700 hover:underline dark:text-sky-300"
              href={view.email ? `mailto:${view.email}` : "#"}
            >
              {view.email || "—"}
            </a>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <span className="text-gray-500">آدرس:</span>{" "}
            <span>{view.address || "—"}</span>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <span className="text-gray-500">کد پستی:</span>{" "}
            <span>{view.postalCode || "—"}</span>
          </div>
        </div>
      </section>
      <Modal
        open={open}
        onClose={() => {
          setForm(view);
          setOpen(false);
        }}
        title="ویرایش اطلاعات مشتری"
        onSubmit={save}
        submitText="ذخیره تغییرات"
      >
        <FieldRow label="نام و نام خانوادگی">
          <input
            value={form.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          />
        </FieldRow>

        <FieldRow label="کد ملی">
          <input
            value={form.nationalId}
            onChange={(e) => onChange({ nationalId: e.target.value })}
            className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          />
        </FieldRow>

        <FieldRow label="تاریخ تولد (YYYY-MM-DD)">
          <input
            value={form.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
            className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          />
        </FieldRow>

        <FieldRow label="جنسیت">
          <select
            value={form.gender ?? ""}
            onChange={(e) =>
              onChange({
                gender: e.target.value
                  ? (e.target.value as Gender)
                  : undefined,
              })
            }
            className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">نامشخص</option>
            <option value="مرد">مرد</option>
            <option value="زن">زن</option>
            <option value="سایر">سایر</option>
          </select>
        </FieldRow>

        <FieldRow label="موبایل">
          <input
            value={form.mobile}
            onChange={(e) => onChange({ mobile: e.target.value })}
            className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          />
        </FieldRow>

        <FieldRow label="ایمیل">
          <input
            value={form.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          />
        </FieldRow>

        <FieldRow label="آدرس">
          <textarea
            value={form.address}
            onChange={(e) => onChange({ address: e.target.value })}
            className="min-h-[70px] w-full rounded border border-gray-300 px-2 py-1 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          />
        </FieldRow>

        <FieldRow label="کد پستی">
          <input
            value={form.postalCode}
            onChange={(e) => onChange({ postalCode: e.target.value })}
            className="h-9 w-full rounded border border-gray-300 px-2 text-[13px] dark:border-gray-700 dark:bg-gray-950"
          />
        </FieldRow>
      </Modal>
    </>
  );
}
