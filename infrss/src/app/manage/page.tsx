// app/manage/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeedData {
  title: string;
  url: string;
}

export default function ManageSubscriptionsPage() {
  const [feeds, setFeeds] = useState<FeedData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("feeds");
    if (stored) {
      setFeeds(JSON.parse(stored));
    }
  }, []);

  const removeFeed = (urlToRemove: string) => {
    const updated = feeds.filter((feed) => feed.url !== urlToRemove);
    setFeeds(updated);
    localStorage.setItem("feeds", JSON.stringify(updated));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Manage Subscriptions</h2>
      {feeds.length === 0 ? (
        <p className="text-gray-500">You have no saved feeds.</p>
      ) : (
        feeds.map((feed) => (
          <Card key={feed.url} className="flex justify-between items-center">
            <CardContent>
              <div>
                <p className="font-semibold">{feed.title}</p>
                <p className="text-sm text-muted-foreground">{feed.url}</p>
              </div>
            </CardContent>
            <Button onClick={() => removeFeed(feed.url)} variant="destructive">
              Remove
            </Button>
          </Card>
        ))
      )}
    </div>
  );
}
