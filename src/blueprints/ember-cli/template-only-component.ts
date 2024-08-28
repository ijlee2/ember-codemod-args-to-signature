import templateOnlyComponent from '@ember/component/template-only';

interface <%= entity.pascalizedName %>Signature {}

const <%= entity.pascalizedName %>Component =
  templateOnlyComponent<<%= entity.pascalizedName %>Signature>();

export default <%= entity.pascalizedName %>Component;
