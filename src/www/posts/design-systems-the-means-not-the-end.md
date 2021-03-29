---
title: 'Design Systems — the means, not the end'
tags: ['design systems']
original_url: 'https://medium.com/@paulmsmith/design-systems-the-means-not-the-end-fc840c21b51e'
social_image: 'content/picnmix.jpg'
date: 2018-10-22
---

Reusable patterns work a treat, except when they don’t.

---

When I bought my first house, it was a busy time, I just needed to get stuff done and quickly! Not unlike the teams a lot of us now work with.

I’d run around stores like Ikea with a list of things I needed for example: bathroom cabinet, shelving units, kitchen cabinets and so on…

They looked good in the store, I’d check the material, open and close the doors, etc and then I’d load up the car and be on my way home.

I’d drag the boxes into the house and start building. Unfortunately there was more than one occasion that I’d nearly built the things before I realised they didn’t fit or would not work as I’d intended once they were actually in my particular room.

If before-hand I had taken the time to think about what I needed and the context that those things would be used, I would have realised that the units were too big and the cabinet doors opened the wrong way for them to be useful in my kitchen and so on.

**I tell this story because it is not unlike the way some teams have been using design systems.**

Simon Wilson recently tweeted:

> “It’s not the “commoditisation” of design through things like design systems that gets me TBH, more people thinking > “ah yeah design system! grab that and plough on!” with no semblance of process, no rigour. A v real danger”

I too have seen what Simon described but I’d also argue that perhaps we (the proponents of design systems) are the reason this is happening.

Is it the result of how design systems have been positioned or ‘sold’ to their audience?

{% imgr {
  imagePath: social_image,
  width: '1250',
  height: '703',
  classes: 'u-1/1',
  alt: 'Photograph of sweets in a Pick ’n’ Mix display'
} %}

In trying to get design systems recognised as a valuable thing to invest in (which I believe they can be) we have described them and their contents with phrases like:

- The “single source of truth”
- Designed to meet user needs
- Already working as part of a live service
- “Represent what good looks like”
- Been through X rounds of user research
- “Battle tested”
- Passes automated and Cross browser tests

So with that in mind, I don’t blame design teams for believing that the patterns and associated components in a design system are some-how a ‘solved problem’ as they grab them 'off the shelf'.

After-all, that is the aspiration of a design system is it not?

Josh Clark wrote an excellent post on what should be the aspiration of a design system, Josh says [the most exciting design systems are ‘boring’](https://bigmedium.com/ideas/boring-design-systems.html)

> When the design system absorbs mundane problems, designers and developers are freed to pursue new science and higher-order problems.

I completely agree that is the goal of a design system but I think that it also depends on the scale and variety of needs that the design system is serving.

So I think it is incumbent upon the teams using a design system to fulfil their side of the deal, which I suspect we as a community have not have spelt out clearly enough, so here are some thoughts on how design systems should be used.

---

## Design systems are a starting point

For most things in life, we don’t ever really want to have to ‘start from scratch’ and design is no different.
Institutional knowledge packaged up as a more easily consumable set of ‘things’ with guidance is great but it is less about simply taking and more about evaluating and then trying.

The [GOVUK Design System](https://gov.uk/design-system) stipulates:

> “The contents of the Design System must be of a high quality and meet user needs”.

However it would be wrong to use the contents whimsically or ignorantly.

Generally teams should know the following three things before using a pattern from a design system:

### 1. When to use a pattern
The scenario this pattern should be employed
### 2. Why they should use a pattern
The needs the pattern meets and how it does so
### 3. How to use a pattern
The way the pattern should be used and implemented

Even then, knowing those things, design teams should also consider the pattern as part of the wider service design because sometimes what works in isolation will not work as part of a bigger (or perhaps different) user journey.

---

## Design System general advice

What consumers/users of a design system should know about using a design system, or put a different way, what most design systems should perhaps do a better job of emphasising.

### Know your problem before you look for a solution

Before you trawl a design system for what you think you’ll need. Like the story of the Ikea woes of my younger days, take the time to be confident that know the problem you are trying to solve in detail so you can make a better judgement about the things on offer.

Armed with the knowledge of the problem you are trying to solve, a Design System should make it clear what needs it meets and in what circumstances it does so which should tell you the when and why questions for a pattern.

### Read the manual
So you have a pattern or component that does appear to meet your needs, don’t let it down by incorrectly employing it.

{% imgr {
  imagePath: 'content/rtm_illustration.png',
  width: '1250',
  height: '417',
  classes: 'u-1/1',
  alt: 'Illustration of The instructions and guidance for a Flatpack'
} %}

Just because what your team has done looks the same does not mean it will perform the same if they skipped past any guidance telling them how to use it.

A lot of hidden effort will likely have gone into ensuring accessibility, performance, responsiveness and service design so ensure that those things are not missed.

Not using part of a design system as intended could undo all that hard work and mean users will not get the benefit.

### Prototype the thing

To torture the flat-pack analogy, wise advice is ‘Do not tighten screws before fully assembled’.

When using design systems, my advice is always to prototype with the components and patterns from a design system. Don’t rush straight to production, no matter how simple that might be to do with the off-the-shelf things you now have access to.

It is still much less effort to spin up a prototype and research it properly than it is to put most things in production. Prototypes don’t need code tests, releases (and release notes) and so on.

### Do your own research

As I’ve said, the efficiency and beauty of a well crafted design system is that you get a leg up and don’t have to start from a blank sheet of paper BUT you should not take for granted that it will ‘just work’ for your users who may well be in a very different context.

There are trade-offs in the design and implementation of a pattern that would be hard to document completely.

A good design system will attempt to make the context clear but that also relies upon a user of the design system to take the time to familiarise themselves with it or understand the context and wider service design of what they are working on.

If a designer does (as Simon Wilson says) just “grab that and plough on” then they might well be doing something bad for their users. So it is important to do user research to validate it is working as expected in your product or service.

---

Design systems are a means to an end. They should give teams a head-start in achieving the outcomes they want but will not always do that out of the box.

So before you use a pattern, **consider if the way you plan to use it (why, when, how) matches the way the design system expects it to be used.**

If you do choose to use the pattern, do your own research to avoid false assurance and If find issues in your context then go one step further by taking the opportunity to make the design system better by feeding your insight back to the community.

---

Thanks to the very generous [Caroline Jarrett](https://twitter.com/cjforms) for helping me say what I meant to say and to [Simon Wilson](https://www.ermlikeyeah.com/) for the excellent food for thought as always.

