namespace bad {
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

  function contains(list: StringList, elem: string): boolean {
    return list.indexOf(elem) !== null;
  }

  function setElement(list: StringList, idx: number, newElem: string): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
  }

  function replaceElement(
    list: StringList,
    oldElem: string,
    newElem: string
  ): boolean {
    const idx = list.indexOf(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
  }

  function chaining(list: StringList): StringList {
    setElement(list, 0, "example");
    return list;
  }

  // ------- Example 1 ---------
  const list1Values = ["hi", "there", "friend"];
  const list1 = {
    indexOf(elem: string): number | null {
      const idx = list1Values.indexOf(elem);
      if (idx === -1) return null;
      return idx;
    }
  };

  // I know that this will work, but the compiler doesn't
  contains(list1, "friend");

  // I can do this, but then why even use typescript
  contains(list1 as StringList, "friend");

  // ------- Example 2 ---------
  const list2Values = ["hi", "there", "friend"];
  const list2 = {
    add(elem: string, idx: number) {
      throw new Error("not implemented");
    },
    remove(idx: number) {
      throw new Error("not implemented");
    },
    indexOf(elem: string): number | null {
      const idx = list2Values.indexOf(elem);
      if (idx === -1) return null;
      return idx;
    }
  };

  // I know that this will work, and the compiler will agree
  contains(list2, "friend");

  // But the compiler allows this, which always throws an error
  replaceElement(list2, "hi", "hello");

  // ------- Example 3 ---------
  const list3Values = ["hi", "there", "friend"];
  const list3 = {
    add(elem: string, idx: number) {
      list3Values.splice(idx, 1, elem);
    },
    remove(idx: number) {
      const deleted = list3Values.splice(idx, 1);
      return deleted.length > 0;
    },
    indexOf(elem: string): number | null {
      const idx = list3Values.indexOf(elem);
      if (idx === -1) return null;
      return idx;
    }
  };

  // Now this works
  // But I had to implement 2 methods that I never used
  contains(list3, "friend");

  // ------- Example 4 ---------
  const list4Values = ["hi", "there", "friend"];
  const list4 = {
    add(elem: string, idx: number) {
      list3Values.splice(idx, 1, elem);
    },
    remove(idx: number) {
      const deleted = list3Values.splice(idx, 1);
      return deleted.length > 0;
    },
    indexOf(elem: string): number | null {
      const idx = list3Values.indexOf(elem);
      if (idx === -1) return null;
      return idx;
    }
  };

  chaining(list4).indexOf("friend");

  type ComplexType = {
    name: string;
    age: number;
    incrementAge: () => void;
  };
}
