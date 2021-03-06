package deploy;

// import entity.Place;
import entity.Home;
import entity.Place;
import entity.Rating;
import entity.Role;
import entity.User;
import facades.UserFacade;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import security.Secret;

@WebListener
public class DeploymentConfiguration implements ServletContextListener {

  public static String PU_NAME = "PU-Local";

  @Override
  @SuppressWarnings("empty-statement")
  public void contextInitialized(ServletContextEvent sce) {
    System.out.println("######################################################################################");
    System.out.println("############################ In ContextIntialized ####################################");
    System.out.println("######################################################################################");

    //Handling init-params from the properties file (secrets that should not be pushed to GIT)
    InputStream input = null;
    Properties prop = new Properties();
    try {
      input = getClass().getClassLoader().getResourceAsStream("/config.properties");;
      if (input == null) {
        System.out.println("Could not load init-properties");
        return;
      }
      prop.load(input);
      Secret.SHARED_SECRET = prop.getProperty("tokenSecret").getBytes();
      input.close();

    } catch (IOException ex) {
      Logger.getLogger(DeploymentConfiguration.class.getName()).log(Level.SEVERE, null, ex);
    }
    ServletContext context = sce.getServletContext();
 
    boolean makeTestUser = context.getInitParameter("makeTestUser").toLowerCase().equals("true");
    if (makeTestUser) {
      EntityManager em = Persistence.createEntityManagerFactory("pu_development").createEntityManager();
      try {
        System.out.println("Creating TEST Users");
        if (em.find(User.class, "user") == null) {
          // Populate with default users/roles
          em.getTransaction().begin();
          
          Role userRole = new Role("User");
          Role adminRole = new Role("Admin");
          User user = new User("user", "test");
          user.addRole(userRole);
          User admin = new User("admin", "test");
          admin.addRole(adminRole);
          User both = new User("user_admin", "test");
          both.addRole(userRole);
          both.addRole(adminRole);
          //Populate with dummy places
          Place p = new Place();
          p.setDescription("Et sted i provinsen");
          p.setImageURL("Somewhere/nice/billede.jpg");
         p.setLatitude("55.783282");
         p.setLongitude("12.502484");
         
         p.setStreet("Egesvinget 11");
         p.setZip("2730");
         
          Place p2 = new Place();
          p2.setDescription("Et sted i lyngby");
          p2.setImageURL("etsted/ilyngby/billede2.jpg");
         p2.setLatitude("55.783282");
         p2.setLongitude("12.502484");
         
         p2.setStreet("Caroline Amalie Vej 35");
         p2.setZip("2800");
         
         Home h1 = new Home();
         h1.setName("Sommerhus1");
         h1.setCity("Lyngby");
         h1.setImage("https://images.sologstrand.dk/001_11-3063_000_006.JPG");
         h1.setStatus(false);
         
         Home h2 = new Home();
         h2.setName("Sommerhus2");
         h2.setCity("Lyngby");
         h2.setImage("https://images.sologstrand.dk/001_41-0087_000_006.JPG");
         h2.setStatus(false);
         
         Home h3 = new Home();
         h3.setName("Sommerhus3");
         h3.setCity("Lyngby");
         h3.setImage("https://sdc.novasol.com/pic/600/a07/a07409_main_01.jpg");
         h3.setStatus(false);
         
         Home h4 = new Home();
         h4.setName("Sommerhus4");
         h4.setCity("Billund");
         h4.setImage("https://www.sommerhusdanmark.dk/uploads/1882/house/7081-1-full.jpg");
         h4.setStatus(false);
         
         Home h5 = new Home();
         h5.setName("Sommerhus5");
         h5.setCity("Billund");
         h5.setImage("https://www.sommerhusdanmark.dk/uploads/1354/house/1427-1-full.jpg");
         h5.setStatus(false);
         
         Home h6 = new Home();
         h6.setName("Sommerhus6");
         h6.setCity("Billund");
         h6.setImage("http://www.ifish.net/gallery/data/500/smoker_tent2.jpg");
         h6.setStatus(false);
         
          Rating rating = new Rating();
          
          rating.setUserId(3);
          rating.setPlaceId(1);
          rating.setRating(2);
         
         em.persist(rating);
        
         //Persist part
          em.persist(userRole);
          em.persist(adminRole);
          em.persist(user);
          em.persist(admin);
          em.persist(both);
          em.persist(p);
          em.persist(p2);
          em.persist(h1);
          em.persist(h2);
          em.persist(h3);
          em.persist(h4);
          em.persist(h5);
          em.persist(h6);
          em.getTransaction().commit();
          System.out.println("Created TEST Users");
        }
      } catch (Exception ex) {
        Logger.getLogger(UserFacade.class.getName()).log(Level.SEVERE, null, ex);
        em.getTransaction().rollback();
      } finally {
        em.close();
      }
    }
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {

  }
}
