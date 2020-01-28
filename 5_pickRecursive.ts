namespace pickRecursive {
  interface StringList {
    /**
     * @param elem The element to add
     * @param idx 0-indexed, the index of the new element
     */
    add(elem: string, idx: number);

    /**
     * @param idx 0-indexed, the index of the element to remove
     */
    remove(idx: number): boolean;

    /**
     * Returns the index of an element, or `null` if it is not in the list
     */
    indexOf(elem: string): number | null;
  }

  function contains(list: Pick<StringList, "indexOf">, elem: string): boolean {
    return list.indexOf(elem) !== null;
  }

  function setElement(
    list: Pick<StringList, "add" | "remove">,
    idx: number,
    newElem: string
  ): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
  }

  type Parameter<
    T extends (...args: any) => any,
    idx extends number
  > = Parameters<T>[idx];

  function replaceElement(
    // It's easier to use the utility type `Parameter` defined above
    list: Pick<StringList, "indexOf"> & Parameter<typeof setElement, 0>,
    oldElem: string,
    newElem: string
  ): boolean {
    const idx = list.indexOf(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
  }

  function chaining<LIST extends Pick<StringList, "add" | "remove">>(
    list: LIST
  ): LIST {
    return list;
  }
}
