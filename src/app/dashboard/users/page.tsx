"use client";

import { useState, useMemo } from "react";
import { Plus, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { UserActions } from "@/src/components/users/user-actions";
import { StatusBadge } from "@/src/components/users/status-badge";
import { getInitials } from "@/src/lib/utils";
import { trpc } from "@/src/components/provider";
import UserDialog from "@/src/components/users/user-dialog";

// ---------- Types ----------
type Role = "Admin" | "Editor" | "Viewer";
type Status = "Active" | "Suspended" | "Invited";

interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
	role: Role;
	status: Status;
	lastLogin: string;
}

// ---------- Mock data ----------
const users: User[] = [
	{
		id: "1",
		name: "Olivia Martin",
		email: "olivia@kore.io",
		avatar: "olivia",
		role: "Admin",
		status: "Active",
		lastLogin: "2 hours ago",
	},
	{
		id: "2",
		name: "Jackson Lee",
		email: "jackson@kore.io",
		avatar: "jackson",
		role: "Editor",
		status: "Active",
		lastLogin: "5 hours ago",
	},
	{
		id: "3",
		name: "Sofia Davis",
		email: "sofia@kore.io",
		avatar: "sofia",
		role: "Viewer",
		status: "Invited",
		lastLogin: "—",
	},
	{
		id: "4",
		name: "Liam Johnson",
		email: "liam@kore.io",
		avatar: "liam",
		role: "Editor",
		status: "Active",
		lastLogin: "1 day ago",
	},
	{
		id: "5",
		name: "Emma Wilson",
		email: "emma@kore.io",
		avatar: "emma",
		role: "Admin",
		status: "Active",
		lastLogin: "3 hours ago",
	},
	{
		id: "6",
		name: "Noah Brown",
		email: "noah@kore.io",
		avatar: "noah",
		role: "Viewer",
		status: "Suspended",
		lastLogin: "2 weeks ago",
	},
	{
		id: "7",
		name: "Ava Garcia",
		email: "ava@kore.io",
		avatar: "ava",
		role: "Editor",
		status: "Active",
		lastLogin: "12 hours ago",
	},
	{
		id: "8",
		name: "Lucas Martinez",
		email: "lucas@kore.io",
		avatar: "lucas",
		role: "Viewer",
		status: "Active",
		lastLogin: "4 days ago",
	},
	{
		id: "9",
		name: "Mia Robinson",
		email: "mia@kore.io",
		avatar: "mia",
		role: "Editor",
		status: "Invited",
		lastLogin: "—",
	},
	{
		id: "10",
		name: "Ethan Clark",
		email: "ethan@kore.io",
		avatar: "ethan",
		role: "Viewer",
		status: "Active",
		lastLogin: "6 hours ago",
	},
	{
		id: "11",
		name: "Isabella Lewis",
		email: "isabella@kore.io",
		avatar: "isabella",
		role: "Admin",
		status: "Active",
		lastLogin: "1 hour ago",
	},
	{
		id: "12",
		name: "Mason Walker",
		email: "mason@kore.io",
		avatar: "mason",
		role: "Viewer",
		status: "Suspended",
		lastLogin: "1 month ago",
	},
	{
		id: "13",
		name: "Charlotte Hall",
		email: "charlotte@kore.io",
		avatar: "charlotte",
		role: "Editor",
		status: "Active",
		lastLogin: "8 hours ago",
	},
	{
		id: "14",
		name: "James Allen",
		email: "james@kore.io",
		avatar: "james",
		role: "Viewer",
		status: "Active",
		lastLogin: "2 days ago",
	},
	{
		id: "15",
		name: "Amelia Young",
		email: "amelia@kore.io",
		avatar: "amelia",
		role: "Editor",
		status: "Invited",
		lastLogin: "—",
	},
	{
		id: "16",
		name: "Benjamin King",
		email: "benjamin@kore.io",
		avatar: "benjamin",
		role: "Viewer",
		status: "Active",
		lastLogin: "10 hours ago",
	},
	{
		id: "17",
		name: "Harper Wright",
		email: "harper@kore.io",
		avatar: "harper",
		role: "Admin",
		status: "Active",
		lastLogin: "30 minutes ago",
	},
	{
		id: "18",
		name: "Alexander Lopez",
		email: "alexander@kore.io",
		avatar: "alexander",
		role: "Viewer",
		status: "Suspended",
		lastLogin: "3 weeks ago",
	},
	{
		id: "19",
		name: "Evelyn Hill",
		email: "evelyn@kore.io",
		avatar: "evelyn",
		role: "Editor",
		status: "Active",
		lastLogin: "1 day ago",
	},
	{
		id: "20",
		name: "Daniel Scott",
		email: "daniel@kore.io",
		avatar: "daniel",
		role: "Viewer",
		status: "Active",
		lastLogin: "7 hours ago",
	},
	{
		id: "21",
		name: "Abigail Green",
		email: "abigail@kore.io",
		avatar: "abigail",
		role: "Editor",
		status: "Active",
		lastLogin: "4 hours ago",
	},
	{
		id: "22",
		name: "Michael Adams",
		email: "michael@kore.io",
		avatar: "michael",
		role: "Viewer",
		status: "Invited",
		lastLogin: "—",
	},
	{
		id: "23",
		name: "Emily Baker",
		email: "emily@kore.io",
		avatar: "emily",
		role: "Admin",
		status: "Active",
		lastLogin: "15 minutes ago",
	},
	{
		id: "24",
		name: "Sebastian Gonzalez",
		email: "sebastian@kore.io",
		avatar: "sebastian",
		role: "Viewer",
		status: "Active",
		lastLogin: "5 days ago",
	},
	{
		id: "25",
		name: "Elizabeth Nelson",
		email: "elizabeth@kore.io",
		avatar: "elizabeth",
		role: "Editor",
		status: "Suspended",
		lastLogin: "2 months ago",
	},
	{
		id: "26",
		name: "Jack Carter",
		email: "jack@kore.io",
		avatar: "jack",
		role: "Viewer",
		status: "Active",
		lastLogin: "9 hours ago",
	},
	{
		id: "27",
		name: "Scarlett Mitchell",
		email: "scarlett@kore.io",
		avatar: "scarlett",
		role: "Editor",
		status: "Active",
		lastLogin: "2 hours ago",
	},
	{
		id: "28",
		name: "Henry Perez",
		email: "henry@kore.io",
		avatar: "henry",
		role: "Viewer",
		status: "Active",
		lastLogin: "3 days ago",
	},
	{
		id: "29",
		name: "Victoria Roberts",
		email: "victoria@kore.io",
		avatar: "victoria",
		role: "Admin",
		status: "Active",
		lastLogin: "45 minutes ago",
	},
	{
		id: "30",
		name: "Owen Turner",
		email: "owen@kore.io",
		avatar: "owen",
		role: "Viewer",
		status: "Invited",
		lastLogin: "—",
	},
	{
		id: "31",
		name: "Grace Phillips",
		email: "grace@kore.io",
		avatar: "grace",
		role: "Editor",
		status: "Active",
		lastLogin: "11 hours ago",
	},
	{
		id: "32",
		name: "William Campbell",
		email: "william@kore.io",
		avatar: "william",
		role: "Viewer",
		status: "Active",
		lastLogin: "1 day ago",
	},
	{
		id: "33",
		name: "Chloe Parker",
		email: "chloe@kore.io",
		avatar: "chloe",
		role: "Editor",
		status: "Active",
		lastLogin: "6 hours ago",
	},
	{
		id: "34",
		name: "Samuel Evans",
		email: "samuel@kore.io",
		avatar: "samuel",
		role: "Viewer",
		status: "Suspended",
		lastLogin: "6 weeks ago",
	},
	{
		id: "35",
		name: "Penelope Edwards",
		email: "penelope@kore.io",
		avatar: "penelope",
		role: "Admin",
		status: "Active",
		lastLogin: "20 minutes ago",
	},
	{
		id: "36",
		name: "Joseph Collins",
		email: "joseph@kore.io",
		avatar: "joseph",
		role: "Viewer",
		status: "Active",
		lastLogin: "8 hours ago",
	},
	{
		id: "37",
		name: "Layla Stewart",
		email: "layla@kore.io",
		avatar: "layla",
		role: "Editor",
		status: "Invited",
		lastLogin: "—",
	},
	{
		id: "38",
		name: "David Sanchez",
		email: "david@kore.io",
		avatar: "david",
		role: "Viewer",
		status: "Active",
		lastLogin: "14 hours ago",
	},
	{
		id: "39",
		name: "Riley Morris",
		email: "riley@kore.io",
		avatar: "riley",
		role: "Editor",
		status: "Active",
		lastLogin: "3 hours ago",
	},
	{
		id: "40",
		name: "Carter Rogers",
		email: "carter@kore.io",
		avatar: "carter",
		role: "Viewer",
		status: "Active",
		lastLogin: "2 days ago",
	},
	{
		id: "41",
		name: "Zoey Reed",
		email: "zoey@kore.io",
		avatar: "zoey",
		role: "Admin",
		status: "Active",
		lastLogin: "1 hour ago",
	},
	{
		id: "42",
		name: "Wyatt Cook",
		email: "wyatt@kore.io",
		avatar: "wyatt",
		role: "Viewer",
		status: "Suspended",
		lastLogin: "4 weeks ago",
	},
];

// ---------- Helpers ----------
const ITEMS_PER_PAGE = 10;

const roleConfig: Record<Role, { className: string }> = {
	Admin: {
		className: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
	},
	Editor: { className: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
	Viewer: { className: "bg-muted text-muted-foreground border-border" },
};

// ---------- Sub‑components ----------
function RoleBadge({ role }: { role: Role }) {
	const config = roleConfig[role];
	return (
		<Badge variant="outline" className={config.className}>
			{role}
		</Badge>
	);
}

// ---------- Page ----------
export default function UsersPage() {
	const [search, setSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [page, setPage] = useState(1);
	const [addDialogOpen, setAddDialogOpen] = useState(false);

	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			const matchesSearch =
				search === "" ||
				user.name.toLowerCase().includes(search.toLowerCase()) ||
				user.email.toLowerCase().includes(search.toLowerCase());
			const matchesRole = roleFilter === "all" || user.role === roleFilter;
			const matchesStatus = statusFilter === "all" || user.status === statusFilter;
			return matchesSearch && matchesRole && matchesStatus;
		});
	}, [search, roleFilter, statusFilter]);

	const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
	const paginatedUsers = filteredUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	const rangeStart = filteredUsers.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
	const rangeEnd = Math.min(page * ITEMS_PER_PAGE, filteredUsers.length);

	// Reset to page 1 when filters change
	const handleSearch = (value: string) => {
		setSearch(value);
		setPage(1);
	};
	const handleRoleFilter = (value: string) => {
		setRoleFilter(value);
		setPage(1);
	};
	const handleStatusFilter = (value: string) => {
		setStatusFilter(value);
		setPage(1);
	};

	const { data, isLoading, error } = trpc.hello.useQuery({ text: "World" });

	if (isLoading) return console.log("loading");
	if (error) return console.log(error);
	console.log(data);

	return (
		<div className="p-6 max-w-350 mx-auto space-y-6">
			{/* Page header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">User Management</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Manage your team members and their account permissions.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						<Download className="size-4" />
						Export CSV
					</Button>

					<Button size="sm" onClick={()=> setAddDialogOpen(true)}>
						<Plus className="size-4" />
						Add New User
					</Button>

				</div>
			</div>

			{/* Filters */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input
						placeholder="Search by name or email..."
						value={search}
						onChange={(e) => handleSearch(e.target.value)}
						className="pl-9 h-9"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Select value={roleFilter} onValueChange={handleRoleFilter}>
						<SelectTrigger size="sm" className="w-32.5">
							<SelectValue placeholder="Role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Roles</SelectItem>
							<SelectItem value="Admin">Admin</SelectItem>
							<SelectItem value="Editor">Editor</SelectItem>
							<SelectItem value="Viewer">Viewer</SelectItem>
						</SelectContent>
					</Select>

					<Select value={statusFilter} onValueChange={handleStatusFilter}>
						<SelectTrigger size="sm" className="w-35">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Statuses</SelectItem>
							<SelectItem value="Active">Active</SelectItem>
							<SelectItem value="Suspended">Suspended</SelectItem>
							<SelectItem value="Invited">Invited</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Table */}
			<div className="rounded-lg border border-border">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[320px]">User</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Last Login</TableHead>
							<TableHead className="w-15 text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedUsers.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
									No users found.
								</TableCell>
							</TableRow>
						) : (
							paginatedUsers.map((user) => (
								<TableRow key={user.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar>
												<AvatarImage
													src={`https://avatar.vercel.sh/${user.avatar}`}
													alt={user.name}
												/>
												<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
											</Avatar>
											<div className="min-w-0">
												<p className="text-sm font-medium leading-none truncate">{user.name}</p>
												<p className="text-sm text-muted-foreground mt-1 truncate">{user.email}</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<RoleBadge role={user.role} />
									</TableCell>
									<TableCell>
										<StatusBadge status={user.status} />
									</TableCell>
									<TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
									<TableCell className="text-right">
										<UserActions />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Showing <span className="font-medium text-foreground">{rangeStart}</span> to{" "}
					<span className="font-medium text-foreground">{rangeEnd}</span> of{" "}
					<span className="font-medium text-foreground">{filteredUsers.length}</span> users
				</p>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled={page === 1}
						onClick={() => setPage((p) => p - 1)}
					>
						<ChevronLeft className="size-4" />
						Previous
					</Button>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
						<Button
							key={p}
							variant={p === page ? "default" : "outline"}
							size="sm"
							className="w-9"
							onClick={() => setPage(p)}
						>
							{p}
						</Button>
					))}
					<Button
						variant="outline"
						size="sm"
						disabled={page >= totalPages}
						onClick={() => setPage((p) => p + 1)}
					>
						Next
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>

			<UserDialog addDialogOpen={addDialogOpen} setAddDialogOpen={setAddDialogOpen}/>
		</div>
	);
}
