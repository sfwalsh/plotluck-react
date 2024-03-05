import { Container } from "inversify";
import { SERVICE_KEYS } from "./service-keys.const";
import "reflect-metadata";

import { ReadingListRepository } from "../repository/ReadingListItem.repository";

const _container = new Container();

_container.bind(SERVICE_KEYS.READINGLIST_REPOSITORY).to(ReadingListRepository).inSingletonScope();

export const container = _container;