# PVT

---

## General overview
The test works as follows:
1. The user clicks on a module of type "pvt".
2. The tutorial page shows up, with an explanation of how to do the test.
3. The user clicks on the `< start test >` button.
4. A countdown is being shown, to inform the user, that the test will start in 3 seconds.
5. Once the countdown is at 0, a blank page with a box is shown.
6. After a random amount of time, a timer appears inside of the box. It counts upwards.
7. The user reacts as soon as possible by touching anywhere on the screen.
8. The time is measured and the user sees the result for a bit.
9. The result disappears, and the test starts again from 6.
10. The test is repeated as many times as specified in the Study file.
11. The final page is shown to the user, the user clicks on submit and gets rerouted to the home page

---

## Output to the server
Once a user clicks on the `< submit >` button, a HTML-POST is sent to the server specified in the study file.
The HTML-POST has the following format:

```
  output: {
    reactionTimes: number[]; // all reaction-times measured.
  }
```

---

## Edge case handling
- If the user doesn't react within the maximum reaction time specified in the study, the "missed entry" is repeated, and not thrown away.
- If the user reacts too early (before the timer is shown), the test will be restarted, meaning the user will have to wait longer than usual.
