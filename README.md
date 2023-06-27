[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-args-to-signature/actions/workflows/CI.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-args-to-signature/actions/workflows/CI.yml)

# ember-codemod-args-to-signature

_Codemod to convert component `Args` to `Signature`_<sup>1</sup>

<sup>1. Components without `Args` are also supported.</sup>


## Features

- Scaffolds [`Signature`](https://typed-ember.gitbook.io/glint/environments/ember/component-signatures) for components
- Scaffolds [`Registry`](https://typed-ember.gitbook.io/glint/environments/ember/template-registry) for components
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
ember-codemod-args-to-signature --src app/components

# V1 addons
ember-codemod-args-to-signature --src addon/components

# V2 addons
ember-codemod-args-to-signature --src src/components
```

<details>
<summary>Optional: Specify the component structure</summary>

By default, an Octane project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
npx ember-codemod-args-to-signature --component-structure="nested"
```

</details>

<details>
<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-args-to-signature --root=<path/to/your/project>
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
./dist/bin/ember-codemod-args-to-signature.js --root=<path/to/your/project>
```


## Compatibility

- Node.js v16 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

If you have an open-sourced project that I can use for testing, reach out to me on [Discord](https://discord.gg/emberjs) at `ijlee2`. Please star this project so that I can gauge its importance to you and the Ember community. ⭐


## License

This project is licensed under the [MIT License](LICENSE.md).
