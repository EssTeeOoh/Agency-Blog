"use client";

import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

const bulletPoints = [
  'How I survived yet another production outage',
  'Why I think most "best practices" are just trauma responses in disguise',
  'Random rants about politics, football, and why pineapple on pizza should be a war crime',
  'The occasional useful tip that might save you 3 hours of debugging (or not, no promises)',
];

export function Content() {
  return (
    <section className="py-12 px-8 bg-white">
      <div className="mx-auto max-w-screen-md text-center md:text-left">
        <Typography color="blue" variant="h6" className="mb-2">
          #qa #webdev #apis #randomthoughts
        </Typography>

        <Typography variant="h2" color="blue-gray" className="mt-6 mb-6">
          Hey, I'm Tee, the guy who breaks things for a living
        </Typography>

        <Typography className="my-8 font-normal text-lg !text-gray-700 leading-relaxed">
          By day: QA Engineer & Web Developer. I spend most of my time making
          sure your app doesn't explode in production (spoiler: it sometimes
          still does), writing APIs that hopefully don't make other developers
          cry, and occasionally building things that actually work.
        </Typography>

        <Typography className="my-4 font-normal text-lg !text-gray-700 leading-relaxed">
          Why do I write here? Because I like to dump my brain somewhere instead
          of just screaming into the void at 2 a.m. Expect a chaotic mix of:
        </Typography>

        {/* Clean bullet list */}
        <ul className="my-4 flex flex-col gap-3 text-left">
          {bulletPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
              <Typography className="font-normal text-lg !text-gray-700 leading-relaxed">
                {point}
              </Typography>
            </li>
          ))}
        </ul>

        <Typography className="my-8 font-normal text-lg !text-gray-700 leading-relaxed italic">
          If you're here hoping for polished, professional content… sorry, wrong
          blog. If you're okay with unfiltered thoughts from someone who still
          panic-Googles regex every single time, welcome. Grab a seat (and
          maybe some popcorn).
        </Typography>

        {/* Author / Follow block */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                width={64}
                height={64}
                src="/images/avatar1.jpg"
                alt="Tee"
                className="object-cover"
              />
            </div>
            <div>
              <Typography variant="h5" color="blue-gray">
                Tee (Ø,G)
              </Typography>
              <Typography className="text-gray-600">
                QA Engineer • Web Dev • Chaos Coordinator
              </Typography>
            </div>
          </div>

          <Link href="/#Join" className="inline-block">
            <Button
              color="blue"
              size="lg"
              className="rounded-full normal-case text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Follow for more chaos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Content;