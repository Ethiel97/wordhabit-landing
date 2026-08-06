<script setup lang="ts">
useHead({
  title: 'Delete your Wordhabit account',
  meta: [
    {
      name: 'description',
      content:
        'How to delete your Wordhabit account and every piece of data attached to it.',
    },
  ],
})
</script>

<template>
  <LegalLayout
    title="Delete your account"
    updated-on="6 August 2026"
    summary="Wordhabit lets you erase your account and everything attached to it, from inside the app, without asking anyone's permission. This page explains how, and exactly what disappears."
  >
    <h2>From inside the app</h2>
    <p>This is the fastest route and it takes under a minute.</p>
    <ul>
      <li>Open <strong>Wordhabit</strong> and sign in.</li>
      <li>Go to the <strong>Profile</strong> tab.</li>
      <li>Open <strong>Settings</strong>.</li>
      <li>Tap <strong>Delete account</strong>.</li>
      <li>Confirm. The deletion is immediate and cannot be undone.</li>
    </ul>

    <h2>By email</h2>
    <p>
      If you have lost access to the app or to your device, write to
      <a href="mailto:hello@wordhabit.app">hello@wordhabit.app</a> from the
      email address on the account, with the subject
      <strong>Delete my account</strong>. We will confirm once it is done,
      within 30 days and usually far sooner.
    </p>

    <h2>What gets deleted</h2>
    <p>
      Everything below is erased permanently. We keep no shadow copy and
      no anonymised remainder tied back to you.
    </p>
    <ul>
      <li>Your account: email address, name, and password.</li>
      <li>
        Your learning profile: the language you were learning, your
        level, and the themes you picked.
      </li>
      <li>
        Your entire learning history: every word you saw, your review
        grades, mastery levels, review schedule, streak and badges.
      </li>
      <li>Your notification token, so reminders stop immediately.</li>
    </ul>

    <h2>What is kept, and for how long</h2>
    <ul>
      <li>
        <strong>Encrypted database backups</strong> — up to 30 days. They
        exist to recover from a failure, are never read for any other
        purpose, and your data disappears from them as they rotate.
      </li>
      <li>
        <strong>Crash diagnostics</strong> — up to 90 days. These records
        describe a software fault, not a person, and carry no account
        identifier once the account is gone.
      </li>
      <li>
        <strong>Records we are legally required to keep</strong> — where
        a law obliges it, for as long as it obliges it, and for nothing
        else.
      </li>
    </ul>

    <h2>Subscriptions</h2>
    <p>
      If you subscribed through the App Store or Google Play, deleting
      your Wordhabit account does <strong>not</strong> cancel the
      subscription — only the store can do that. Cancel it in your store
      account before deleting, or you will keep being billed for a
      service you can no longer reach.
    </p>

    <p>
      More detail on what we collect and why is in our
      <NuxtLink to="/privacy">Privacy Policy</NuxtLink>.
    </p>
  </LegalLayout>
</template>
