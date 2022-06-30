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

## Edge cases
#### 1. The user doesn't react within the maximum time specified in the study file
- In this case, the entry will be marked as "-1", and the total number of trials will be incremented by 1. A message will be shown to the user indicating that his reaction took too long.

#### 2. The user reacts too early (before the timer is shown).
- In this case, the entry will be marked as "-2", and the total number of trials will be incremented by 1. A message will be shown to the user indicating that he reacted too early. The test will be restarted.

## Input for the pvt
The following parameters are set by the study:

- numOfTrials: Determines, how many reaction times will be measured.
- timeInterval: Determines the time Interval, in which the timer pops up. The probability distribution is uniform.
  - min: Determines the minimum number of milliseconds after which the timer could pop up.
  - max: Determines the maximum number of milliseconds that can pass, before the timer pops up.
- showResults: Determines, whether after all the tests the user will see the "results page".
- maxReactionTime: Determines the number of milliseconds, that can pass without reaction, after which the entry will be thrown away, and the test will be restarted.
- enableExit: Determines, whether the user is able to exit/finish the game early.
- submitText: Determines the text, which the submit button shows.
