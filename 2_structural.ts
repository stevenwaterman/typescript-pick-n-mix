namespace structural {
  interface Searchable {
    /**
     * Returns the index of an element, or `null` if it is not in the list
     */
    find(elem: string): number | null;
  }

  interface Mutable {
    /**
     * @param elem The element to add
     * @param idx 0-indexed, the index of the new element
     */
    add(elem: string, idx: number);
    /**
     * @param idx 0-indexed, the index of the element to remove
     */
    remove(idx: number): boolean;
  }

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
    find(elem: string): number | null;
  }

  function contains(list: Searchable, elem: string): boolean {
    return list.find(elem) !== null;
  }

  function setElement(list: Mutable, idx: number, newElem: string): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
  }

  function replaceElement(
    list: StringList,
    oldElem: string,
    newElem: string
  ): boolean {
    const idx = list.find(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
  }

  function chaining<LIST extends Mutable>(list: LIST): LIST {
    return list;
  }

  // ------- Example 1 ---------
  const list1Values = ["hi", "there", "friend"];
  const list1 = {
    find(elem: string): number | null {
      const idx = list1Values.indexOf(elem)
      if(idx === -1) return null;
      return idx;
    }
  };

  // This is ok
  contains(list1, "friend");

  // This correctly causes an error
  replaceElement(list1, "hi", "hello");

  // But I have to write many interfaces - up to 1 per set of functionality
  // And I lose the semantic information in the docs

  // ------- Example 2 ---------
  const list2Values = ["hi", "there", "friend"];
  const list2 = {
    add(elem: string, idx: number) {
      list2Values.splice(idx, 1, elem);
    },
    remove(idx: number): boolean {
      const deleted = list2Values.splice(idx, 1);
      return deleted.length > 0;
    },
    find(elem: string): number | null {
      const idx = list2Values.indexOf(elem);
      if (idx === -1) return null;
      return idx;
    }
  };

  // I have to use generics in the _chaining_ method to do this
  const chained = chaining(list2);
  typeof chained === typeof list2;

  // If i just defined it as
  // `function chaining(list: Mutable): Mutable`
  // Or
  // `function chaining(list: Mutable): typeof list`
  // Then `typeof chained` would be `Mutable`
}
