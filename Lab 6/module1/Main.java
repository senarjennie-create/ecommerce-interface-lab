public class Main {
    public static void main(String[] args) {

        Car car = new Car();
        car.startEngine();

        Motorcycle moto = new Motorcycle();
        moto.startEngine();

        Tesla tesla = new Tesla();
        tesla.startEngine();
        tesla.chargeBattery();
    }
}