"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// - UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Testimonies = () => {
  const [taskTest, setTaskTest] = useState("");
  const [pending, setPending] = useState(false);
  const testTasks = useQuery(api.testTaskTable.get);
  const createTestTask = useMutation(api.testTaskTable.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskTest.trim()) return;

    setPending(true);
    try {
      await createTestTask({ taskTest });
      console.log("📗 [ Data Created ]:", taskTest);
      setTaskTest("");
    } catch (error) {
      console.log("📕 [ Error ]:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="container flex min-h-[80vh] flex-col items-center justify-center">
      {/* - Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <Input
          type="text"
          name="taskTest"
          value={taskTest}
          onChange={(e) => setTaskTest(e.target.value)}
          placeholder="Enter task test value..."
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Test Database"}
        </Button>
      </form>

      {/* - Data Display Section */}
      {testTasks && testTasks.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <p className="mb-4 text-xl font-semibold">Test Task Table Data:</p>
          <div className="space-y-2">
            {testTasks.map(({ _id, taskTest }) => (
              <Card key={_id}>
                <CardContent className="px-4 py-2">{taskTest}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonies;
