import { Plus, Pencil, Trash2 } from "lucide-react";
import Table from "@/components/common/Table";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import { contentItems } from "@/lib/data";

export default function ContentManagementPage() {
  const columns = [
    { key: "type", label: "Type" },
    { key: "title", label: "Title" },
    { key: "status", label: "Status" },
    { key: "updated", label: "Last updated" },
    { key: "actions", label: "" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Manage testimonials, FAQs, blog posts and announcements shown on the public site.</p>
        <Button icon={Plus}>New content</Button>
      </div>

      <Table
        columns={columns}
        data={contentItems}
        renderCell={(key, row) => {
          if (key === "type") return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{row.type}</span>;
          if (key === "title") return <span className="font-medium text-gray-900">{row.title}</span>;
          if (key === "status") return <StatusBadge status={row.status} />;
          if (key === "actions") return (
            <div className="flex justify-end gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><Pencil className="h-4 w-4" /></button>
              <button className="p-2 rounded-lg hover:bg-red-50 text-primary"><Trash2 className="h-4 w-4" /></button>
            </div>
          );
          return row[key];
        }}
      />
    </div>
  );
}
