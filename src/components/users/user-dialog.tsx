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

interface Props {
	addDialogOpen: boolean;
	setAddDialogOpen: (bool: boolean) => void;
}

export default function UserDialog({ addDialogOpen, setAddDialogOpen }: Props) {
	return (
		<>
			<Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
				{/* <DialogTrigger asChild>
					<Button size="sm">
						<Plus className="size-4" />
						Add New User
					</Button>
				</DialogTrigger> */}
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
							<Input id="name" placeholder="e.g. Jane Smith" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email Address</Label>
							<Input id="email" type="email" placeholder="jane@kore.io" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="role">Role</Label>
							<Select defaultValue="Viewer">
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
						<Button onClick={() => setAddDialogOpen(false)}>Send Invitation</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
