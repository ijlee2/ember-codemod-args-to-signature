import templateOnlyComponent from '@ember/component/template-only';

interface <%= entity.pascalizedName %>Signature {}

const <%= entity.pascalizedName %> =
  templateOnlyComponent<<%= entity.pascalizedName %>Signature>();

export default <%= entity.pascalizedName %>;
