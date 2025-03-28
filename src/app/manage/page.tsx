// app/manage/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeFeedFromStorage, loadFeedsFromStorage } from "@/lib/rssUtils";

interface FeedData {
  title: string;
  url: string;
}

export default function ManageSubscriptionsPage() {
  const [feeds, setFeeds] = useState<FeedData[]>([]);

  useEffect(() => {
    setFeeds(loadFeedsFromStorage());
  }, []);

  const removeFeed = (urlToRemove: string) => {
    removeFeedFromStorage(urlToRemove);
    setFeeds((prev) => prev.filter((feed) => feed.url !== urlToRemove));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Subscriptions</h2>
      {feeds.length === 0 ? (
        <p className="text-gray-500">You have no saved feeds.</p>
      ) : (
        feeds.map((feed) => (
          <Card
            key={feed.url}
            className="bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <CardContent className="flex-1 p-4">
              <p className="font-medium text-gray-800 break-words">{feed.title}</p>
              <p className="text-sm text-gray-500 break-all">{feed.url}</p>
            </CardContent>
            <div className="px-4 pb-4 sm:pb-0">
              <Button onClick={() => removeFeed(feed.url)} variant="destructive">
                Remove
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
