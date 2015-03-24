# -*- coding=utf -*-
from random import randint, seed
from Queue import Empty
from time import sleep, time

ROOMS = [
#    01234567
    "xxx  xxx" \
    "x       " \
    "x xxxxxx" \
    "  x     " \
    "  x     " \
    "x x  xxx" \
    "x    x  " \
    "x    x  ",

#    01234567
    "xxx  xxx" \
    "x       " \
    "x       " \
    "        " \
    "        " \
    "x    g  " \
    "x       " \
    "x       ",

#    01234567
    "xxxxxxxx" \
    "x xr r  " \
    "x xr r  " \
    "  xxxxx " \
    "        " \
    "x       " \
    "x       " \
    "x       ", \

#    01234567
    "xxx  xxx" \
    "x       " \
    "x       " \
    "        " \
    "   g    " \
    "x       " \
    "x       " \
    "x       ",
]

TILE_WIDTH = 50
TILE_HEIGHT = 50

ROOM_WIDTH = 8
ROOM_HEIGHT = 8
ROOMS_X = 4
ROOMS_Y = 3
MAP_WIDTH = ROOM_WIDTH * ROOMS_X
MAP_HEIGHT = ROOM_HEIGHT * ROOMS_Y


class Game(object):
    def __init__(self, queue, broadcast_state_function):
        self.queue = queue

        self.world = World()
        self.broadcast_state = broadcast_state_function

        seed(int(time()))

    def run(self):
        while True:
            message = None

            try:
                message = self.queue.get_nowait()
            except Empty:
                # print("--- sleeping")
                sleep(0.1)

            if message == "stop":
                print("!!! stopped!")
                break

            if message:
                print("<-- got message: {}".format(message))

            msg = "Updating world."
            self.update_badguys_position()
            self.correct_for_collisions_with_canvas_bounds()

            self.check_for_collison_with_rectangle()

            badguy_json = self.all_list_to_json(self.world.badguy_list)
            rect_json = self.all_list_to_json(self.world.rect_list)

            self.broadcast_state({"msg":msg, "badguy_json":badguy_json, "rect_json":rect_json}) 


    def update_badguys_position(self):
        for badguy in self.world.badguy_list:
            badguy.action()


    def all_list_to_json(self, item_list):

        list_of_json = []
        for item in item_list:
            list_of_json.append(item.to_json())

        return list_of_json

    def correct_for_collisions_with_canvas_bounds(self):

        for badguy in self.world.badguy_list:
            if badguy.x <= 0 or badguy.x + badguy.width >= self.world.width:

                # badguy.move(dy=badguy.dy,dx=-badguy.x_direction*badguy.speed)
                badguy.move(dy=badguy.dy,dx=-badguy.dx)

        for badguy in self.world.badguy_list:
            if badguy.y <= 0 or badguy.y + badguy.height >= self.world.height:

                # badguy.move(dy=-badguy.y_direction*badguy.speed,dx=badguy.dx)
                badguy.move(dy=-badguy.dy,dx=badguy.dx)




    def rectangle_on_rectangle_collision(self, rect1, rect2):

        return rect1.x < rect2.x + rect2.width and \
           rect1.x + rect1.width > rect2.x and \
           rect1.y < rect2.y + rect2.height and \
           rect1.height + rect1.y > rect2.y


    def check_for_collison_with_rectangle(self):

        for badguy in self.world.badguy_list:
            for rect in self.world.rect_list:
                if self.rectangle_on_rectangle_collision(badguy,rect):

                    badguy.x -= badguy.dx
                    if not self.rectangle_on_rectangle_collision(badguy,rect):
                        badguy.x += badguy.dx
                        badguy.move(dy=badguy.y_direction,dx=-badguy.dx)

                    else:

                        badguy.x += badguy.dx
                        badguy.move(dy=-badguy.dy,dx=badguy.x_direction)


class Player(object):
    def __init__(self):

        self.health = 3
        self.x = 0
        self.y = 0
        self.points = 0

    def move(self,dy,dx):

        self.x += dx
        self.y += dy

    def attack(self):
        #do some attacking
        pass

    def to_json(self):

        return {"health":self.health, "x":self.x, "y":self.y, "points":self.points}


class Badguy(object):

    def __init__(self,type, x, y):

        self.health = 1
        self.x = x
        self.y = y
        self.dx = 0
        self.dy = 0
        self.type = type
        self.y_direction = 1
        self.x_direction = 1

        if type=='goblin':
            self.speed = 8
            self.width = 50
            self.height = 50
            self.action = self.patrol

        elif type=='rat':
            self.speed = 4
            self.width = 50
            self.height = 20
            self.action = self.explore

    def patrol(self):

        self.move(dy=randint(-2,2),dx=self.x_direction*self.speed)

    def explore(self):

        self.move(dy=self.y_direction*(self.speed + randint(0,5)),dx=self.x_direction*(self.speed*3 + randint(0,5)))


    def move(self,dy,dx):

        self.dx = dx
        self.dy = dy
        self.x += dx
        self.y += dy

        if self.dx >= 0:
            self.x_direction = 1
        else:
            self.x_direction = -1

        if self.dy >= 0:
            self.y_direction = 1
        else:
            self.y_direction = -1

    def to_json(self):

        return {"health":self.health, "x":self.x, "y":self.y, "type":self.type, "dx":self.dx, "dy":self.dy, "width":self.width, "height":self.height}


class Rect(object):

    def __init__(self, x, y):

        self.width = TILE_WIDTH
        self.height = TILE_HEIGHT
        self.x = x
        self.y = y
        self.color = "#855E42"

    def to_json(self):

        return {"x":self.x, "y":self.y, "width":self.width, "height":self.height, "color":self.color}


class World(object):

    def __init__(self):

        self.width = TILE_WIDTH * MAP_WIDTH
        self.height = TILE_HEIGHT * MAP_HEIGHT

        self.tiles = [None] * MAP_WIDTH * MAP_HEIGHT

        self.build_map()

        for x in range(0, ROOMS_X):
            for y in range(0, ROOMS_Y):
                choice = randint(0, len(ROOMS)-1)
                room = ROOMS[choice]
                self.place_room(x * ROOM_WIDTH, y * ROOM_HEIGHT, room)

        self.build_map()

    def get_tile(self, x, y):
        return self.tiles[x + y*MAP_WIDTH]

    def set_tile(self, x, y, obj):
        self.tiles[x + y*MAP_WIDTH] = obj

    def place_room(self, origin_x, origin_y, room):
        for x in range(0, ROOM_WIDTH):
            for y in range(0, ROOM_HEIGHT):
                tile = room[y * ROOM_WIDTH + x]

                self.set_tile(origin_x + x,
                                origin_y + y,
                                tile)

    def build_map(self):
        self.rect_list = []
        self.badguy_list = []

        for x in range(0, MAP_WIDTH):
            for y in range(0, MAP_HEIGHT):
                item = self.tiles[y*MAP_WIDTH + x]

                if item == 'x':
                    # TODO: rename to Wall
                    rect = Rect(x * TILE_WIDTH, y * TILE_HEIGHT)
                    self.rect_list.append(rect)
                elif item == 'r':
                    self.badguy_list.append(Badguy('rat', x*TILE_WIDTH, y*TILE_HEIGHT))
                elif item == 'g':
                    self.badguy_list.append(Badguy('goblin', x*TILE_WIDTH, y*TILE_HEIGHT))

