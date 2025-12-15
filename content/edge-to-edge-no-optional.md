+++
author = "huyhunhngc"
title = "The Guide to Mandatory Edge-to-Edge in Jetpack Compose"
date = "2025-07-29"
description = "Edge-to-Edge Is No Longer Optional — Android 16 Migration Guide."
tags = [
    "jetpack compose", "android", "google"
]
toc = true
+++
![inspiration](https://developer.android.com/static/images/design/ui/mobile/e2e-app-contrast.gif "AThe Complete Guide to Mandatory Edge-to-Edge and Window Insets in Jetpack Compose")
*Figure 1: Left. An app that isn't edge-to-edge. Right. An app that is edge-to-edge. (Source: [Android Developer](https://developer.android.com/design/ui/mobile/guides/layout-and-content/edge-to-edge))*


Starting with **Android 16 (API 36)**, an edge-to-edge display is no longer optional. The opt-out mechanism is gone, and apps are expected to draw behind the system bars by default. If your app isn't prepared, its UI will break, especially on Android 15 and newer.

This guide combines the "why" of this mandatory change with the "how" of implementing a robust solution using Jetpack Compose's `WindowInsets` API.

## 1\. The Problem: Edge-to-Edge is Now Mandatory

The old fallback mechanism is now completely ignored:
```xml
android:windowOptOutEdgeToEdgeEnforcement="true"
```

This forces all apps into an edge-to-edge state. If your UI wasn't built with this in mind, you will encounter serious issues:

  * **Content Obscured**: Buttons, text, and other critical elements will be hidden under the status and navigation bars.
  * **Incorrect Insets**: The on-screen keyboard (IME) will overlap input fields, and bottom bars may appear to float incorrectly.
  * **Inconsistent Layouts**: Screens will have inconsistent padding, with some appearing broken while others look fine.
  * **Hardcoded Spacing Fails**: Static padding values like `16.dp` are no longer reliable and will cause layout failures.

## 2\. The First Step: Enabling Edge-to-Edge and Deprecating Accompanist

Your first action is to properly enable edge-to-edge drawing in your `Activity` and remove outdated libraries.

### Enable with the Official API

In your `Activity`'s `onCreate` method, use the `enableEdgeToEdge()` helper function.

```kotlin
import androidx.activity.ComponentActivity
import androidx.activity.enableEdgeToEdge

class MyActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // This is the new, official way to enable edge-to-edge.
        enableEdgeToEdge() 
        
        super.onCreate(savedInstanceState)
        setContent {
            // Your Compose content
        }
    }
}
```

### Stop Using Accompanist's `SystemUiController`

The Accompanist `SystemUiController` is now **deprecated**. The `enableEdgeToEdge()` function and the modern `WindowInsets` API in Compose are its official replacements.

**The Old Way (Deprecated):**

```kotlin
// DO NOT use this anymore. This is the legacy approach.
val systemUiController = rememberSystemUiController()
SideEffect {
    systemUiController.setSystemBarsColor(
        color = Color.Transparent,
        isNavigationBarContrastEnforced = false
    )
}
```

## 3\. Using `Scaffold`: The Right Way

The `Scaffold` composable is the primary tool for handling insets. It automatically calculates padding for system bars and its own components (like `TopAppBar`).

```kotlin
Scaffold(
    topBar = { TopAppBar(...) }
) { innerPadding ->
    // Apply the padding provided by Scaffold to your content's container.
    LazyColumn(
        modifier = Modifier.padding(innerPadding)
    ) {
        // List content
    }
}
```

### ⚠️ A Common Pitfall: `Scaffold` with a `bottomBar`

Be careful when using a `Scaffold` with a `bottomBar`. The returned `innerPadding` value includes the height of **both** the system navigation bar *and* your app's `bottomBar`.

If you apply this `innerPadding` directly to your screen's content, you will get **extra, unwanted space** at the bottom.

### The Better Approach: A Single, Top-Level `Scaffold`

Instead of wrapping each screen in a `Scaffold`, wrap your **entire `NavHost`** in a single `Scaffold`. This centralizes inset management and avoids the double-padding issue.

```kotlin
Scaffold(
    bottomBar = { MyBottomBar(...) }
) { innerPadding ->
    NavHost(
        navController = navController,
        startDestination = "home",
        // Apply only the bottom padding from the Scaffold to the NavHost.
        // This pushes the NavHost content above the bottom bar without adding extra space.
        modifier = Modifier.padding(bottom = innerPadding.calculateBottomPadding())
    ) {
        // Your composable destinations
    }
}
```

## 4\. Granular Control with `WindowInsets` Modifiers

For layouts without a `Scaffold` or when you need finer control, use the `WindowInsets` modifiers directly.

  * **`WindowInsets.safeDrawing`**: The recommended inset for most content. It represents all areas where system UI could potentially obscure your content (system bars, IME, display cutouts).
  * **`Modifier.safeDrawingPadding()`**: A convenient shortcut to apply padding for the `safeDrawing` insets.
  * **`Modifier.windowInsetsPadding(insets)`**: Applies padding for a specific inset, like `WindowInsets.navigationBars` or `WindowInsets.ime`.
  * **`Modifier.consumeWindowInsets(insets)`**: Prevents child composables from receiving and applying the same inset padding again. This is crucial for nested layouts.

<!-- end list -->

```kotlin
Column(
    modifier = Modifier
        // Apply padding for system bars at the parent level
        .windowInsetsPadding(WindowInsets.systemBars)
        // Consume the insets so children don't apply them again
        .consumeWindowInsets(WindowInsets.systemBars)
) {
    // Child composables here will not get extra padding.
}
```

## 5\. Updating Legacy Components

The mandatory edge-to-edge change also affects older components.

  * **Replace `ModalBottomSheetLayout`**: This Accompanist component is outdated and can have visual bugs with insets. Migrate to Material 3's **`BottomSheetScaffold`**, which correctly handles insets and gestures.

## 6\. A Practical Migration Strategy

If you have a large codebase, a full rewrite might be risky. Consider a staged approach.

  * **Phase 1: Quick Fix**

    1.  Patch the screens that are most visibly broken.
    2.  Wrap them in a `Scaffold` and correctly apply `innerPadding`.
    3.  Ensure the nav bar contrast is handled correctly via `enableEdgeToEdge`.

  * **Phase 2: Clean Migration**

    1.  Refactor to a top-level `Scaffold` around your `NavHost`.
    2.  Replace all instances of `ModalBottomSheetLayout` with `BottomSheetScaffold`.
    3.  Remove all hardcoded padding values and rely on the `WindowInsets` API.
    4.  Thoroughly test edge cases: keyboard interactions, split-screen mode, dark mode, and gesture navigation.

## 7\. Guidelines for Future Development

1.  **Always use `Scaffold`** as your primary layout root.
2.  **Avoid nested `Scaffold`s**. Use one top-level `Scaffold` to manage global UI elements.
3.  **Pass `innerPadding` from `Scaffold`**. Never hardcode padding to avoid system UI.
4.  **Use `BottomSheetScaffold`** for all bottom sheets.
5.  **Ensure design system components respect insets**. If you use custom components, they must be aware of and react to `WindowInsets`.

## References
[Android 16 Migration Guide series](https://medium.com/@qamar_safadi/edge-to-edge-is-no-longer-optional-android-16-migration-guide-66f82db639c0)