import { Badge } from "../ui/badge";

export type Status = "Active" | "Suspended" | "Invited";

const statusConfig: Record<Status, { dotClassName: string; badgeClassName: string }> = {
  Active: {
    dotClassName: "bg-emerald-500",
    badgeClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  Suspended: {
    dotClassName: "bg-red-500",
    badgeClassName: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  Invited: {
    dotClassName: "bg-amber-500",
    badgeClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={config.badgeClassName}>
      <span className={`size-1.5 rounded-full ${config.dotClassName}`} />
      {status}
    </Badge>
  );
}