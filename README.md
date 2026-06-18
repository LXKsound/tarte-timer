# Tarte Time · French Kiss Bistro

A funny animated one-page countdown site for colleagues who need to know when it is time for tarte at the French Kiss Bistro.

## What is included

- `index.html` – page structure
- `styles.css` – animated steampunk bistro illustration
- `script.js` – daily tarte countdown and button interaction

No build step, no framework and no external assets are required.

## How to use with GitHub Pages

1. Copy these files into your GitHub repository.
2. Commit and push.
3. In GitHub, open **Settings → Pages**.
4. Select your branch, usually `main`, and the root folder.
5. Open the GitHub Pages URL.

## Change the tarte time

Open `script.js` and change:

```js
tarteHour: 15,
tarteMinute: 0,
```

For example, for 14:30:

```js
tarteHour: 14,
tarteMinute: 30,
```

## Change the wording

Also in `script.js`, edit:

```js
restaurantName: "French Kiss Bistro",
eventName: "Tarte Time",
```

You can also edit the funny rotating messages in the `messages` array.
