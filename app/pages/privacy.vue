<script setup lang="ts">
useHead({
  title: 'Privacy Policy — Wordhabit',
  meta: [
    {
      name: 'description',
      content:
        'What Wordhabit collects, why, who processes it, and how to get it deleted.',
    },
  ],
})
</script>

<template>
  <LegalLayout
    title="Privacy Policy"
    updated-on="6 August 2026"
    summary="Wordhabit collects what it needs to teach you words and nothing more. This page lists every piece of data, every company that touches it, and how to have all of it deleted."
  >
    <h2>The short version</h2>
    <p>
      We store your account, your learning progress, and the diagnostics
      that tell us when the app is broken. We do not sell your data, we do
      not run advertising, and we do not build profiles for anyone else.
      You can delete everything from inside the app, permanently, without
      asking us.
    </p>

    <h2>Who we are</h2>
    <p>
      Wordhabit is operated by Ethiel Adiassa. For anything on this page,
      including access and deletion requests, write to
      <a href="mailto:hello@wordhabit.app">hello@wordhabit.app</a>.
    </p>

    <h2>What we collect</h2>

    <h3>Data you give us</h3>
    <ul>
      <li>
        <strong>Email address</strong> — to create your account, verify it,
        sign you in, and send account emails such as verification and
        password resets.
      </li>
      <li>
        <strong>Name or username</strong> — to address you in the app.
      </li>
      <li>
        <strong>Learning preferences</strong> — the language you are
        learning, your level, and the themes you picked, which decide
        which words you are shown.
      </li>
    </ul>

    <h3>Data the app produces as you use it</h3>
    <ul>
      <li>
        <strong>Learning progress</strong> — which words you have seen,
        how you graded yourself, your mastery levels, your review
        schedule, your streak and your badges. This is the product: it is
        what lets the app show you a word again at the right moment.
      </li>
      <li>
        <strong>Usage events</strong> — which screens you open and which
        actions you take, so we can tell which parts of the app help and
        which do not.
      </li>
      <li>
        <strong>Crash and performance diagnostics</strong> — the technical
        detail of an error when the app fails, including device model and
        operating system version.
      </li>
      <li>
        <strong>Push notification token</strong> — an identifier issued by
        your device, used only to deliver your daily reminder. It is
        stored only if you allow notifications.
      </li>
    </ul>

    <h3>What we never collect</h3>
    <p>
      No contacts, no location, no photos, no microphone, no advertising
      identifier, no browsing activity outside the app. When the app saves
      an image to your gallery — sharing a word card — it writes the file
      to your device and sends us nothing.
    </p>

    <h2>Why we are allowed to hold it</h2>
    <p>
      Under the GDPR, account data and learning progress are processed to
      <strong>perform our contract</strong> with you: without them the app
      cannot function. Diagnostics and usage analytics rest on our
      <strong>legitimate interest</strong> in keeping the app working and
      improving it. Push notifications rest on your
      <strong>consent</strong>, which your device asks for and which you
      can withdraw at any time in your system settings.
    </p>

    <h2>Who processes it</h2>
    <p>
      We use a small number of service providers. They process data on our
      instructions and may not use it for their own purposes.
    </p>
    <table>
      <thead>
        <tr>
          <th>Provider</th>
          <th>What it handles</th>
          <th>Where</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fly.io</td>
          <td>Application hosting and database</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Google Firebase</td>
          <td>Push notification delivery</td>
          <td>United States</td>
        </tr>
        <tr>
          <td>Sentry</td>
          <td>Crash and performance diagnostics</td>
          <td>United States</td>
        </tr>
        <tr>
          <td>PostHog</td>
          <td>Product analytics</td>
          <td>United States</td>
        </tr>
        <tr>
          <td>Resend</td>
          <td>Account emails</td>
          <td>United States</td>
        </tr>
      </tbody>
    </table>
    <p>
      Transfers outside the European Economic Area rely on the European
      Commission's Standard Contractual Clauses.
    </p>
    <p>
      Wordhabit generates its vocabulary using OpenAI. This happens on our
      side, ahead of time, to build a shared library of words.
      <strong>No user data is ever sent to OpenAI</strong> — not your
      account, not your progress, not the words you struggle with.
    </p>

    <h2>How long we keep it</h2>
    <ul>
      <li>
        <strong>Account and learning data</strong> — for as long as your
        account exists.
      </li>
      <li>
        <strong>After deletion</strong> — purged within 30 days, including
        from backups as they rotate.
      </li>
      <li>
        <strong>Crash diagnostics</strong> — 90 days.
      </li>
      <li>
        <strong>Usage events</strong> — 12 months.
      </li>
    </ul>

    <h2>Deleting your data</h2>
    <p>
      Open <strong>Profile → Delete account</strong>. Your account is
      closed straight away and erased 30 days later, which gives you time
      to change your mind by signing in again. The erasure covers your
      account, your progress, your badges and your notification token,
      and we keep no shadow copy.
    </p>
    <p>
      If you cannot reach the app, email
      <a href="mailto:hello@wordhabit.app">hello@wordhabit.app</a> from the
      address on the account and we will do it for you.
    </p>

    <h2>Your other rights</h2>
    <p>
      If you are in the European Economic Area or the United Kingdom, you
      may ask for a copy of your data, ask us to correct it, ask us to
      restrict or stop a particular use, and receive it in a portable
      format. Write to us and we will answer within one month. You may
      also complain to your national data protection authority.
    </p>

    <h2>Children</h2>
    <p>
      Wordhabit is not directed at children under 13, and we do not
      knowingly collect their data. If you believe a child has created an
      account, write to us and we will remove it.
    </p>

    <h2>Security</h2>
    <p>
      All traffic between the app and our servers is encrypted in transit.
      Passwords are stored hashed, never in readable form. Access to the
      production database is restricted to the operator.
    </p>

    <h2>Changes</h2>
    <p>
      If we change what we collect or who processes it, we will update
      this page and change the date at the top. Material changes will be
      announced in the app before they take effect.
    </p>
  </LegalLayout>
</template>
