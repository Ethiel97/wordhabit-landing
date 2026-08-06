<script setup lang="ts">
useHead({
  title: 'Support — Wordhabit',
  meta: [
    {
      name: 'description',
      content:
        'Get help with Wordhabit: reminders, progress, account and billing questions, and how to reach a human.',
    },
  ],
})
</script>

<template>
  <LegalLayout
    eyebrow="Support"
    title="Help & support"
    updated-on="6 August 2026"
    summary="A real person reads every message. Most questions are answered below — if yours is not, write to us and you will hear back."
  >
    <h2>Contact us</h2>
    <p>
      Email <a href="mailto:hello@wordhabit.app">hello@wordhabit.app</a>.
      We answer within two business days.
    </p>
    <p>
      If you are reporting something broken, tell us your device, your
      operating system version, and what you were doing when it happened.
      That is usually enough for us to reproduce it.
    </p>

    <h2>The daily word</h2>

    <h3>Why only one word a day?</h3>
    <p>
      Because a word you can use precisely is worth thirty you
      half-recognise. Wordhabit is built around retention, not volume:
      one word, understood properly, then brought back at the moment you
      are about to forget it.
    </p>

    <h3>Can I get more than one word a day?</h3>
    <p>
      Not by design. You can, however, review as many past words as you
      like — the flashcard deck holds everything due today, and your
      library holds everything you have ever met.
    </p>

    <h3>Where does the vocabulary come from?</h3>
    <p>
      Words are drawn from a curated corpus, filtered by the language you
      are learning, your level, and the themes you selected during setup.
      You can change those any time in <strong>Profile → Topics</strong>
      and <strong>Profile → Language &amp; level</strong>.
    </p>

    <h2>Reminders</h2>

    <h3>I am not receiving my daily reminder</h3>
    <p>Three things to check, in this order:</p>
    <ul>
      <li>
        <strong>Profile → Notifications</strong> — the reminder must be
        switched on, with a time set.
      </li>
      <li>
        <strong>Your system settings</strong> — if you declined the
        notification prompt when you first opened the app, iOS and
        Android will not ask again. The app's notification screen links
        straight to the right system page.
      </li>
      <li>
        <strong>Battery saver and Focus modes</strong> — both can hold
        back notifications silently.
      </li>
    </ul>

    <h3>Can I change the time?</h3>
    <p>
      Yes, in <strong>Profile → Notifications</strong>. The reminder
      follows your device's timezone, so it stays correct when you
      travel.
    </p>

    <h2>Progress</h2>

    <h3>How is mastery calculated?</h3>
    <p>
      Every word carries a mastery level from 0 to 100. Meeting a word
      seeds it, and each recall you grade as correct moves it up. Getting
      one wrong does not push it back down — it simply returns sooner.
      Penalising honesty would only teach you to lie to the app.
    </p>

    <h3>Why did a word come back so soon?</h3>
    <p>
      Because you marked it as forgotten. A missed word returns the next
      day; a recalled one moves out by anywhere from three to thirty
      days, depending on how well you know it. That widening gap is what
      makes the memory stick.
    </p>

    <h3>What is XP for, and how do levels work?</h3>
    <p>
      XP measures effort over time: the daily journey is worth the most,
      each correct recall and quiz answer adds a little, and every badge
      pays a bonus. There are ten levels, and each one takes noticeably
      more than the last — the tenth is meant to be a genuine
      achievement, not a formality.
    </p>

    <h3>I lost my streak</h3>
    <p>
      Streaks count calendar days in your own timezone, and there is no
      way to restore one. We know that stings. It is also the only thing
      that makes a streak mean anything.
    </p>

    <h2>Your account</h2>

    <h3>I forgot my password</h3>
    <p>
      Tap <strong>Forgot password</strong> on the sign-in screen. A reset
      link goes to your email address. If it does not arrive within a few
      minutes, check your spam folder before writing to us.
    </p>

    <h3>I never received my verification email</h3>
    <p>
      The signup screen can resend it. If it still does not arrive, the
      address may have a typo — write to us from the address you meant to
      use and we will fix it.
    </p>

    <h3>Can I change my email address?</h3>
    <p>
      Yes, in <strong>Profile → Settings</strong>. The new address has to
      be confirmed before it takes effect.
    </p>

    <h3>How do I delete my account?</h3>
    <p>
      <strong>Profile → Settings → Delete account</strong>. It is
      immediate and permanent. Full details of what is erased are on the
      <NuxtLink to="/delete-account">account deletion page</NuxtLink>.
    </p>

    <h2>Billing</h2>
    <p>
      Wordhabit is currently free. If paid plans arrive, they will be
      billed through the App Store or Google Play, and those stores — not
      us — will handle payment, renewal and refunds. Cancelling always
      happens in your store account, never here.
    </p>

    <h2>Privacy</h2>
    <p>
      What we collect, who processes it, and how long we keep it is set
      out in our <NuxtLink to="/privacy">Privacy Policy</NuxtLink>. The
      short version: we do not sell your data, we run no advertising, and
      you can erase everything from inside the app.
    </p>
  </LegalLayout>
</template>
