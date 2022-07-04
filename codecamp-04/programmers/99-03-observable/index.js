const observer = {
  next: function (data) {
    console.log(data);
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    console.log("finished");
  },
};

const observable = {
  subscribe: function (ob) {
    [10, 20, 30].forEach((x) => ob.next(x));
  },
};

observable.subscribe(observer);
