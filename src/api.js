// все для аутентификации
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// все для работы с БД дел
import { getDatabase, ref, push, set, get, query } from "firebase/database";

// регистрация
export async function register(email, password) {
  try {
    const oUC = await createUserWithEmailAndPassword(
      // функция разграничения доступа firebase
      getAuth(),
      email,
      password
    );
    // возвращаем объект user
    return oUC.user;
  } catch (err) {
    return err.code;
  }
}

// логин
export async function login(email, password) {
  try {
    const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
    return oUC.user;
  } catch (err) {
    return err.code;
  }
}

// выход
export async function logout() {
  await signOut(getAuth());
}

// добавление дела
export async function add(user, deed) {
  // получаем объект БД (getDatabase), передаем его функции ref, затем указываем путь по которому будет храниться коллекция дел
  // идендификтор юзера (user.uid) получаем по свойству user.uid (он предварительно вошел уже в приложение)
  // функция ref вернет вернет объект ссылки на путь к созданной коллекции дел
  // в итоге функция push создаст новый идентификатор, добавит его к пути заданной ссылки, тем самым получив путь к новому объекту с делами
  const oRef = await push(ref(getDatabase(), `users/${user.uid}/todos`));
  // новую ссылку на пустой (пока что пустой) объект с делами (oRef) используем для добавления нового дела (deed) с помощью функции set()
  await set(oRef, deed);
  // функция query преобразует ссылку на новый документ в БД (deed) в запрос, этот запрос передадим в функцию get(), которая вернет объект со всеми данными нового дела (имя, описание, дата создание, изображение и тд)
  const oSnapshot = await get(query(oRef));
  // извлекаем новый документ с помощью функции val(), но он не содержит идентификатора (key), задаем его самостоятельно
  const oDeed = oSnapshot.val();
  // задаем key для нового дела
  oDeed.key = oRef.key;
  // возвращем дело
  return oDeed;
}

// читаем все дела из БД firebase и пихаем их в стейт App.js
export async function getList(user) {
  // как в функции add, создаем ссылку на список дел в БД firebase конкретного пользователя (user) с помощью query
  // затем извлекаем объект с делами с помощью функции get
  const oSnaphot = await get(
    query(ref(getDatabase(), `users/${user.uid}/todos`))
  );
  // объект, в который запихнем все дела из ссылки выше
  const oArr = [];
  // дело, в которое запишем все свойства из дел в БД firebase (с помощью forEach)
  let oDeed;
  oSnaphot.forEach((oDoc) => {
    // извлекаем все свойства каждого дела из БД и пихаем в новое дело oDeed, но не забываем вручную указать key каждого дела
    // все это нужно для state, чтобы отобразить все дела при синхронизации с БД firebase (когда юзер вошел в приложение)
    oDeed = oDoc.val();
    oDeed.key = oDoc.key;
    // пушим все новые дела, что есть в БД firebase в новый массив oArr
    oArr.push(oDeed);
  });
  return oArr;
}

// пометка дела как выполненного
export async function setDone(user, key) {
  // сначала даем ссылку для функции set на конкретное дело юзера в БД (с помощью key), затем просто передаем значение true
  return set(ref(getDatabase(), `users/${user.uid}/todos/${key}/done`), true);
}
