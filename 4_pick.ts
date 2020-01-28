namespace pick {
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

  function replaceElement(
    // List all methods on StringList rather than just doing
    // `list: StringList`
    // As it is sustainable when new functionality is added to StringList
    list: Pick<StringList, "indexOf" | "add" | "remove">,
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

  // ------- Example 1 ---------
  const list1Values = ["hi", "there", "friend"];
  const list: Pick<StringList, "indexOf"> = {
    indexOf(elem: string): number | null {
      const idx = list1Values.indexOf(elem);
      if (idx === -1) return null;
      return idx;
    }
  };
  
  // This is ok
  contains(list, "friend");

  // This correctly causes an error
  replaceElement(list, "hi", "hello");

  // But I have to write many interfaces - 1 per interface method
  // This does not require refacting your interfaces
}
