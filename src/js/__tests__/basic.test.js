import Team from '../team';
import Character from '../character';

test('В Team нельзя добавить объект, который не принадлежит к классу Character', () => {
  function result() {
    const team = new Team();
    team.add({});
  }
  expect(result).toThrow('Добавить можно только объект класса Character');
});

test('В team можно добавить персонажа', () => {
  const team = new Team();
  team.add(new Character('cat'));
  const result = team.members.size;
  expect(result).toBe(1);
});

test('В Team нельзя добавить персонажа, который там уже есть', () => {
  function result() {
    const team = new Team();
    const member = new Character('cat');
    team.add(member);
    team.add(member);
  }
  expect(result).toThrow('Нельзя добавить персонажа, который уже есть в команде');
});

test('В team можно добавить n объектов Character', () => {
  const n = 5;
  const team = new Team();
  const members = {};
  for (let index = 0; index < n; index += 1) {
    members[`member${index}`] = new Character('cat');
  }
  team.addAll(members.member0, members.member1, members.member2, members.member3, members.member4);
  const result = team.members.size;
  expect(result).toBe(n);
});


test('В team можно добавить n объектов Character, при этом дублироваться персонажи не будут', () => {
  const n = 5;
  const team = new Team();
  const arr = {};
  for (let index = 0; index < n; index += 1) {
    arr[`char${index}`] = new Character('cat');
  }
  team.addAll(arr.char0, arr.char0, arr.char1, arr.char2, arr.char2, arr.char3, arr.char4);
  const result = team.members.size;
  expect(result).toBe(n);
});

test('Команду персонажей можно воспринимать как массив', () => {
  const n = 5;
  const team = new Team();
  const arr = {};
  for (let index = 0; index < n; index += 1) {
    arr[`char${index}`] = new Character('cat');
  }
  team.addAll(arr.char0, arr.char0, arr.char1, arr.char2, arr.char2, arr.char3, arr.char4);
  const result = Array.isArray(team.toArray());
  expect(result).toBeTruthy();
});
