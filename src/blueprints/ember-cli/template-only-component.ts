import templateOnlyComponent from '@ember/component/template-only';

interface <%= entity.classifiedName %>Signature {}

const <%= entity.classifiedName %>Component =
  templateOnlyComponent<<%= entity.classifiedName %>Signature>();

export default <%= entity.classifiedName %>Component;
