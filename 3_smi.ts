namespace smi {
  interface I_add {
    /**
     * @param elem The element to add
     * @param idx 0-indexed, the index of the new element
     */
    add(elem: string, idx: number);
  }
  interface I_remove {
    /**
     * @param idx 0-indexed, the index of the element to remove
     */
    remove(idx: number): boolean;
  }
  interface I_find {
    /*
     * Returns the index of an element, or `null` if it is not in the list
     */
    find(elem: string): number | null;
  }

  function contains(list: I_find, elem: string): boolean {
    return list.find(elem) !== null;
  }

  function setElement(
    list: I_add & I_remove,
    idx: number,
    newElem: string
  ): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
  }

  function replaceElement(
    list: I_find & I_add & I_remove,
    oldElem: string,
    newElem: string
  ): boolean {
    const idx = list.find(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
  }

  function chaining<LIST extends I_add & I_remove>(list: LIST): LIST {
    return list;
  }

  // ------- Example 1 ---------
  const list1Values = ["hi", "there", "friend"];
  const list1 = {
    find(elem: string): number | null {
      const idx = list1Values.indexOf(elem);
      if (idx === -1) return null;
      return idx;
    }
  };

  // This is ok
  contains(list1, "friend");

  // This correctly causes an error
  replaceElement(list1, "hi", "hello");

  // But I have to write many interfaces - 1 per interface method
  // I can add semantic documentation on the docs
}
