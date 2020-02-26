import { toJS } from 'mobx';

const Stringify = (data: object): object =>
  Object.entries(data).reduce(
    (prev, [key, value]) =>
      value && typeof value === 'object'
        ? {
          ...prev,
          ...(Array.isArray(value)
            ? { [key]: value }
            : value.constructor && value.constructor.name === 'Store'
              ? {}
              : { [key]: Stringify(toJS(value)) }),
        }
        : { ...prev, [key]: value },
    {},
  );

export default Stringify;
