import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "../ui/select";
import { Label } from "../ui/label";
import { trpc } from "../provider";
import { useState } from "react";

interface Props {
	addDialogOpen: boolean;
	setAddDialogOpen: (bool: boolean) => void;
}

type UserRole = "Admin" | "Editor" | "Viewer";

export default function UserDialog({ addDialogOpen, setAddDialogOpen }: Props) {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [role, setRole] = useState<UserRole>("Viewer");

	const mutation = trpc.addUser.useMutation({

		

		onSuccess: (data) => {
			console.log("Success!, Server returned:", data);
			setAddDialogOpen(false);
		},

		onError: (error) => {
			console.log("Mutation error:", error);
		},

		onSettled: () => {
			console.log("Mutation finished.");
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate({
			email,
			name,
			role
		});
	};

	return (
		<>
			<Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New User</DialogTitle>
						<DialogDescription>
							Invite a new team member to your workspace. They will receive an email invitation.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="e.g. Jane Smith"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="jane@kore.io"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="role">Role</Label>
							<Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
								<SelectTrigger>
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Admin">Admin</SelectItem>
									<SelectItem value="Editor">Editor</SelectItem>
									<SelectItem value="Viewer">Viewer</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setAddDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>Send Invitation</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
