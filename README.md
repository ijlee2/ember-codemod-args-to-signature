[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-args-to-signature/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-args-to-signature/actions/workflows/ci.yml)

# ember-codemod-args-to-signature

_Codemod to convert component `Args` to `Signature`_<sup>1</sup>

<sup>1. Components without `Args` are also supported.</sup>


## What is it?

To introduce Glint, you will need to write the [signature](https://typed-ember.gitbook.io/glint/environments/ember/component-signatures) and [template registry](https://typed-ember.gitbook.io/glint/environments/ember/template-registry) for each component. This can be an error-prone, onerous task for large projects.

You can run this codemod to automate the required change.


## Features

- Scaffolds signature for components
- Adds template registry for components
- Preserves your code whenever possible
- Focuses on maintainability and extensibility

<div align="center">
  <figure>
    <img alt="A code diff to show what template-only components can look like before and after running ember-codemod-args-to-signature" src="https://github.com/ijlee2/ember-codemod-args-to-signature/assets/16869656/55115b27-682e-4f5a-9a03-36d7aa1cc0c2" width="640">
    <br>
    <figcaption>Template-only components</figcaption>
  </figure>
  <br><br>
  <figure>
    <img alt="A code diff to show what Glimmer components can look like before and after running ember-codemod-args-to-signature" src="https://github.com/ijlee2/ember-codemod-args-to-signature/assets/16869656/4feb1fcd-5a31-419e-9feb-2af99073ae75" width="640">
    <img alt="Another code diff for a Glimmer component" src="https://github.com/ijlee2/ember-codemod-args-to-signature/assets/16869656/c8c1c9b0-28a1-4957-9c49-5cc853499a4f" width="640">
    <br>
    <figcaption>Glimmer components</figcaption>
  </figure>
</div>


## Usage

Step 1. Quickly migrate.

```sh
cd <path/to/your/project>
npx ember-codemod-args-to-signature <arguments>
```

Step 2. Review the package.

- [x] Fill in missing type information.
- [x] Confirm that you can run all scripts in `package.json`.

For more information, please check the [FAQ](#frequently-asked-questions).


### Prerequisites

Must:

- Migrate to the Octane layout (flat or nested). You can leverage the codemods for [classic](https://github.com/ember-codemods/ember-component-template-colocation-migrator) and [pod](https://github.com/ijlee2/ember-codemod-pod-to-octane) layouts.
- If you have component classes written in JavaScript, change the file extension to `*.ts` to allow the codemod to add `Signature` and `Registry`.

Nice to do:

- Refactor code (e.g. Glimmerize components, meet the linting rule `no-implicit-this`) to help the codemod parse code.


### Arguments

You must pass `--src` to indicate the location of your components.

```sh
# Apps
npx ember-codemod-args-to-signature --src app/components

# V1 addons
npx ember-codemod-args-to-signature --src addon/components

# V2 addons
npx ember-codemod-args-to-signature --src src/components
```

<details>

<summary>Optional: Specify the component structure</summary>

By default, an Octane project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
npx ember-codemod-args-to-signature --component-structure nested
```

</details>

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-args-to-signature --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases. (Classic components are not supported.)

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-args-to-signature.js --root <path/to/your/project>
```


## Frequently asked questions

<details>

<summary>How can I introduce Glint incrementally?</summary>

In a small project, we may go ahead with replacing `tsc --noEmit`, the default command for `lint:types` that is set by `ember-cli`, with the command `glint`.


```diff
/* package.json */
{
  "scripts": {
    "lint": "concurrently \"npm:lint:*(!fix)\" --names \"lint:\"",
    "lint:js": "eslint . --cache",
    "lint:js:fix": "eslint . --fix",
-     "lint:types": "tsc --noEmit"
+     "lint:types": "glint"
  }
}
```

However, in a large project (e.g. a monorepo with many packages), we will want to introduce Glint and fix incorrect types incrementally. A divide-and-conquer strategy will help you parallelize work, make smaller pull requests, and help others avoid merge conflicts.

So, instead, create a script called `_lint:glint`. This script helps you check if Glint is set up right and which errors exist already. The underscore also prevents the `lint` script from running Glint in continuous integration (since the command `glint` will likely fail at first).

```diff
/* package.json */
{
  "scripts": {
+     "_lint:glint": "glint",
    "lint": "concurrently \"npm:lint:*(!fix)\" --names \"lint:\"",
    "lint:js": "eslint . --cache",
    "lint:js:fix": "eslint . --fix",
    "lint:types": "tsc --noEmit"
  }
}
```

After you have fixed all type errors in the package, you can remove `_lint:glint` and use `lint:types` to run `glint`.

```diff
/* package.json */
{
  "scripts": {
-     "_lint:glint": "glint",
    "lint": "concurrently \"npm:lint:*(!fix)\" --names \"lint:\"",
    "lint:js": "eslint . --cache",
    "lint:js:fix": "eslint . --fix",
-     "lint:types": "tsc --noEmit"
+     "lint:types": "glint"
  }
}
```

</details>

<details>

<summary>Passing a signature to <code>templateOnlyComponent()</code> caused a type error with the message, <code>Expected 0 type arguments, but got 1.</code>. What should I do?</summary>

Likely, your project relies on `ember-source@v3` and `@types/ember__component@v3`.

Unfortunately, [`@types/ember__component@v3`](https://www.npmjs.com/package/@types/ember__component/v/3.16.6?activeTab=code) doesn't allow passing the signature to `templateOnlyComponent()` (we can see this from the file named `template-only.d.ts`), while [`@types/ember__component@v4`](https://www.npmjs.com/package/@types/ember__component/v/4.0.14?activeTab=code) does. Updating the package to `v4` isn't a viable option when you aren't on `ember-source@v4`.

Until you can update `ember-source`, I can provide three (3) fixes to temporarily address the type error. Each approach has pros and cons.

1. Don't pass the signature to `templateOnlyComponent()`, but keep the signature in the file for reference.

    ```diff
    import templateOnlyComponent from '@ember/component/template-only';

    + // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface NavigationMenuSignature {
      // ...
    }

    - const NavigationMenuComponent = templateOnlyComponent<NavigationMenuSignature>();
    + const NavigationMenuComponent = templateOnlyComponent();

    export default NavigationMenuComponent;
    ```

    This will help you focus on updating import paths and fixing formatting issues, e.g. by running the scripts `lint:types`, `lint:js:fix`, and `lint:js`.

    The downsides? Assuming the [`@glint-ignore` directive](https://typed-ember.gitbook.io/glint/using-glint/directives#glint-ignore) is not used, the `glint` command (the `_lint:glint` script) can never pass, since template-only components don't provide a signature. Because the signature is missing, `ember-codemod-args-to-signature` will create an extra `Signature` if you run the codemod again.

2. Create an empty backing class.

    ```diff
    - import templateOnlyComponent from '@ember/component/template-only';
    + import Component from '@glimmer/component';

    interface NavigationMenuSignature {
      // ...
    }

    - const NavigationMenuComponent = templateOnlyComponent<NavigationMenuSignature>();

    - export default NavigationMenuComponent;
    + export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {}
    ```

    The `glint` command can now pass potentially. However, the components are no longer template-only. This might be a concern if maintaining a high performance is a factor.

3. Patch `@types/ember__component@v3`.

    If you have experience with patching dependencies, you can patch the file `template-only.d.ts` so that its code matches that from `@types/ember__component@v4`. Note, there may be multiple files of `template-only.d.ts` that you will need to patch.

    The `glint` command can pass potentially and the components remain template-only. However, it's unclear if there are files in `ember-source@v3` that assume `template-only.d.ts` to provide types in the way that it does in `v3`.

</details>


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

If you have an open-sourced project that I can use for testing, reach out to me on [Discord](https://discord.gg/emberjs) at `ijlee2`. Please star this project so that I can gauge its importance to you and the Ember community. ⭐


## License

This project is licensed under the [MIT License](LICENSE.md).
